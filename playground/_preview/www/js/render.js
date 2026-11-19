/* 세스코 모바일 오피스 — 화면 그리기 (데이터 → 화면)
 * <main data-region="화면ID"> 가 있는 화면만 동작한다. CescoData.load(화면ID) 결과를 CescoRender[화면ID] 가 그린다.
 * 상태: loading · ready · empty · error — 문서 안의 [data-view="상태 …"] 묶음만 보이고 나머지는 hidden.
 * 줄 모양은 화면 HTML 안의 <template data-tpl="…"> 를 복제한다(클래스는 퍼블 그대로). 처음 HTML의 예시 내용은 같은 데이터로 다시 그려도 똑같다.
 */
(function () {
  var KST = 9 * 3600e3, DAY = 864e5;
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var ms = function (iso) { return new Date(iso).getTime(); };
  var kday = function (t) { return Math.floor((t + KST) / DAY); };                 /* 한국 날짜 번호 */
  var hm = function (t) { var d = new Date(t + KST); return pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()); };
  var md = function (t) { var d = new Date(t + KST); return (d.getUTCMonth() + 1) + '월 ' + d.getUTCDate() + '일'; };
  var nowIso = function () { return new Date().toISOString(); };

  function clone(name) {
    var t = document.querySelector('template[data-tpl="' + name + '"]');
    return t.content.firstElementChild.cloneNode(true);
  }
  function show(state) {
    $$('[data-view]').forEach(function (v) { v.hidden = v.getAttribute('data-view').split(' ').indexOf(state) < 0; });
    var r = document.querySelector('[data-region]');
    r.setAttribute('data-state', state); r.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
  }
  function bind(name, v) { $$('[data-bind="' + name + '"]').forEach(function (x) { x.textContent = v; }); }
  function heading(id, label, n, cls) {
    var h = document.createElement('h2');
    h.className = 'mo-group' + (cls ? ' ' + cls : ''); h.id = id;
    h.appendChild(document.createTextNode(label + (n == null ? '' : ' ')));
    if (n != null) { var b = document.createElement('b'); b.textContent = n; h.appendChild(b); }
    return h;
  }

  var R = window.CescoRender = {};

  /* 업무 (오늘 할 일) — tasks */
  R['MOW-CM-030101'] = {
    draw: function (box, d) {
      var now = ms(d.as_of), today = kday(now), late = [], open = [], done = [];
      d.tasks.forEach(function (t) { (t.done_at ? done : ms(t.due_at) < now ? late : open).push(t); });
      var byDue = function (a, b) { return ms(a.due_at) - ms(b.due_at); };
      late.sort(byDue); open.sort(byDue); done.sort(function (a, b) { return ms(b.done_at) - ms(a.done_at); });
      bind('remaining', late.length + open.length);
      box.innerHTML = '';
      if (!d.tasks.length) return 'empty';
      var due = function (t) {
        var x = ms(t.done_at || t.due_at), gap = today - kday(x);
        return gap === 0 ? hm(x) : gap === 1 ? '어제 ' + hm(x) : md(x) + ' ' + hm(x);
      };
      [['grpLate', '마감 지남', late, 'mo-group--alert'], ['grpToday', '오늘', open], ['grpDone', '완료', done]].forEach(function (g) {
        if (!g[2].length) return;
        box.appendChild(heading(g[0], g[1], g[2].length, g[3]));
        var ul = document.createElement('ul'); ul.className = 'mo-todo'; ul.setAttribute('aria-labelledby', g[0]);
        g[2].forEach(function (t) {
          var li = clone('todo'), inp = li.querySelector('.ui-ctl__input');
          li.dataset.id = t.id;
          if (g[0] === 'grpLate') li.classList.add('is-late');
          if (t.done_at) { li.classList.add('is-done'); inp.checked = true; li.querySelector('.ui-ctl').classList.add('is-on'); }
          inp.setAttribute('aria-label', (t.done_at ? '완료 취소: ' : '완료로 표시: ') + t.title);
          li.querySelector('.mo-todo__title').textContent = t.title;
          li.querySelector('.mo-todo__desc').textContent = t.customer_name + (t.memo ? ' · ' + t.memo : '');
          li.querySelector('.mo-todo__due').appendChild(document.createTextNode(due(t)));
          if (t.target_screen) { var a = li.querySelector('.mo-todo__main'); a.href = t.target_screen + '.html'; a.removeAttribute('data-todo'); }
          ul.appendChild(li);
        });
        box.appendChild(ul);
      });
      return 'ready';
    },
    wire: function (box, d, redraw) {   /* 체크 = 완료 / 취소 (저장 API 연결 전: 화면에서만) */
      box.addEventListener('change', function (e) {
        var li = e.target.closest('.mo-todo__row'); if (!li || !e.target.matches('.ui-ctl__input')) return;
        d.tasks.forEach(function (t) { if (t.id === li.dataset.id) t.done_at = e.target.checked ? nowIso() : null; });
        redraw();
      });
    }
  };

  /* 알림 — notifications */
  var NOTI_EMPTY = { all: '새 알림이 없어요', work: '업무 알림이 없어요', schedule: '일정 알림이 없어요', notice: '공지 알림이 없어요' };
  R['MOW-CM-020101'] = {
    filter: 'all',
    draw: function (box, d) {
      var self = this, now = ms(d.as_of), today = kday(now);
      var list = d.notifications.filter(function (n) { return self.filter === 'all' || n.category === self.filter; });
      box.innerHTML = '';
      bind('noti-empty', NOTI_EMPTY[this.filter]);
      if (!list.length) return 'empty';
      var groups = [['nToday', '오늘', []], ['nYday', '어제', []], ['nWeek', '이번 주', []], ['nOld', '이전', []]];
      list.forEach(function (n) { var gap = today - kday(ms(n.created_at)); groups[gap <= 0 ? 0 : gap === 1 ? 1 : gap < 7 ? 2 : 3][2].push(n); });
      var when = function (n) {
        var t = ms(n.created_at), gap = today - kday(t), min = Math.round((now - t) / 6e4);
        return gap <= 0 ? (min < 15 ? Math.max(min, 1) + '분 전' : hm(t)) : gap === 1 ? '어제 ' + hm(t) : md(t);
      };
      var icons = document.querySelector('template[data-tpl="noti-ic"]').content;
      groups.forEach(function (g) {
        if (!g[2].length) return;
        g[2].sort(function (a, b) { return (!!a.read_at - !!b.read_at) || ms(b.created_at) - ms(a.created_at); });
        box.appendChild(heading(g[0], g[1]));
        var sec = document.createElement('section'); sec.className = 'mo-card mo-card--list'; sec.setAttribute('aria-labelledby', g[0]);
        var ul = document.createElement('ul'); ul.className = 'mo-noti__list';
        g[2].forEach(function (n) {
          var li = clone('noti'), a = li.querySelector('.mo-noti__row'), ic = icons.querySelector('[data-type="' + n.type + '"]');
          if (ic) li.querySelector('.mo-noti__ic').appendChild(ic.firstElementChild.cloneNode(true));
          li.querySelector('.mo-noti__title').textContent = n.title;
          li.querySelector('.mo-noti__desc').textContent = n.body;
          li.querySelector('.mo-noti__time').textContent = when(n);
          if (n.target_screen) a.href = n.target_screen + '.html'; else a.setAttribute('data-todo', '');
          if (!n.read_at) { a.classList.add('is-unread'); a.appendChild(clone('noti-dot')); }
          ul.appendChild(li);
        });
        sec.appendChild(ul); box.appendChild(sec);
      });
      return 'ready';
    },
    wire: function (box, d, redraw) {
      var self = this;
      $$('[data-filter]').forEach(function (c) { c.addEventListener('click', function () { self.filter = c.getAttribute('data-filter'); redraw(); }); });
      $$('[data-read-all]').forEach(function (b) { b.addEventListener('click', function () { d.notifications.forEach(function (n) { if (!n.read_at) n.read_at = nowIso(); }); redraw(); }); });
    }
  };

  /* 실행 */
  var region = document.querySelector('[data-region]');
  if (!region || !window.CescoData) return;
  var id = region.getAttribute('data-region'), screen = R[id], box = region.querySelector('[data-view~="ready"]');
  if (!screen || !box) return;
  var wired = false;
  function start() {
    var slow = setTimeout(function () { show('loading'); }, 150);   /* 바로 오면 스켈레톤 없이 */
    if (CescoData.state === 'loading') show('loading');
    CescoData.load(id).then(function (d) {
      clearTimeout(slow);
      var redraw = function () { show(screen.draw(box, d)); };
      redraw();
      if (!wired) { screen.wire(box, d, redraw); wired = true; }
    }, function () { clearTimeout(slow); show('error'); });
  }
  document.addEventListener('click', function (e) { if (e.target.closest('[data-retry]')) { show('loading'); setTimeout(start, 400); } });
  start();
})();
