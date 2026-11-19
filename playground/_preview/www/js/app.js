/* 세스코 모바일 오피스 — 화면 동작
 * 상태는 클래스와 aria 로만 바꾼다: is-on · is-active · is-stuck · is-signed / aria-checked · aria-selected
 * 데이터를 바꾸는 일(저장 · 조회)은 여기서 하지 않는다 — 개발에서 붙인다.
 */
(function () {
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* 상단 고정 영역: 스크롤되면 아래 선 */
  var top = document.querySelector('.mo-top');
  if (top) {
    var onScroll = function () { top.classList.toggle('is-stuck', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* 스위치: 행 전체가 누르는 영역 */
  $$('.ui-sw[role="switch"]').forEach(function (sw) {
    var row = sw.closest('.ui-cell') || sw;
    row.style.cursor = 'pointer';
    row.addEventListener('click', function () {
      var on = !sw.classList.contains('is-on');
      sw.classList.toggle('is-on', on); sw.setAttribute('aria-checked', on);
    });
  });

  /* 세그먼트 · 탭: 하나만 선택 */
  $$('.ui-seg').forEach(function (seg) {
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('.ui-seg__item'); if (!b) return;
      $$('.ui-seg__item', seg).forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-checked', x === b); });
    });
  });

  /* 체크박스: 입력 상태를 is-on 으로 */
  $$('.ui-ctl .ui-ctl__input').forEach(function (inp) {
    var sync = function () { inp.closest('.ui-ctl').classList.toggle('is-on', inp.checked); };
    inp.addEventListener('change', sync); sync();
  });

  /* 체감효과 5단계 슬라이더 */
  $$('.mo-effect').forEach(function (box) {
    var range = box.querySelector('.mo-effect__range'), fill = box.querySelector('.ui-slider__fill'), thumb = box.querySelector('.ui-slider__thumb');
    var ticks = $$('.mo-effect__ticks span', box), out = box.querySelector('.mo-effect__now');
    var sync = function () {
      var v = +range.value, at = v * 25;
      fill.style.setProperty('--to', at); thumb.style.setProperty('--at', at);
      ticks.forEach(function (t, i) { t.classList.toggle('is-on', i === v); });
      if (out) out.textContent = ticks[v].textContent;
      range.setAttribute('aria-valuetext', ticks[v].textContent);
    };
    range.addEventListener('input', function () { sync(); if (navigator.vibrate) navigator.vibrate(8); });
    sync();
  });

  /* 서명 */
  $$('.mo-sign').forEach(function (box) {
    var cv = box.querySelector('canvas'), ctx = cv.getContext('2d'), drawing = false;
    var fit = function () {
      var r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
      cv.width = r.width * d; cv.height = r.height * d; ctx.scale(d, d);
      ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = getComputedStyle(box).getPropertyValue('--cs-text-primary') || getComputedStyle(document.body).color;
    };
    var pos = function (e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    fit();
    cv.addEventListener('pointerdown', function (e) { drawing = true; cv.setPointerCapture(e.pointerId); var p = pos(e); ctx.beginPath(); ctx.moveTo(p[0], p[1]); box.classList.add('is-signed'); });
    cv.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pos(e); ctx.lineTo(p[0], p[1]); ctx.stroke(); });
    cv.addEventListener('pointerup', function () { drawing = false; });
    var clear = document.querySelector('[data-sign-clear]');
    if (clear) clear.addEventListener('click', function () { fit(); box.classList.remove('is-signed'); });
  });

  /* 가림 정보 보기 · 다시 가리기: data-reveal (aria-pressed) */
  document.querySelectorAll('[data-reveal]').forEach(function (b) {
    b.addEventListener('click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); });
  });

  /* 순서 편집 모드: data-edit 켜기 · data-edit-cancel / data-edit-done 끄기 (끌어 놓기 · 저장은 개발에서) */
  var app = document.querySelector('.mo-app');
  var editOff = function () { app.classList.remove('is-editing'); $$('[data-edit]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); };
  $$('[data-edit]').forEach(function (b) { b.addEventListener('click', function () { app.classList.add('is-editing'); b.setAttribute('aria-pressed', 'true'); }); });
  $$('[data-edit-cancel], [data-edit-done]').forEach(function (b) { b.addEventListener('click', editOff); });

  /* 알림: 모두 읽음 */
  $$('[data-read-all]').forEach(function (b) { b.addEventListener('click', function () { $$('.is-unread').forEach(function (x) { x.classList.remove('is-unread'); }); }); });

  /* 칩 묶음(role=radiogroup): 하나만 선택 — 선택 = is-active (DS: 연파랑 바탕 · 파란 글자) */
  $$('[role="radiogroup"]').forEach(function (g) {
    if (!g.querySelector('.ui-chip')) return;
    g.addEventListener('click', function (e) {
      var c = e.target.closest('.ui-chip'); if (!c) return;
      $$('.ui-chip', g).forEach(function (x) { var on = x === c; x.classList.toggle('is-active', on); x.setAttribute('aria-checked', on); });
    });
  });

  /* 비밀번호 보기 */
  $$('[data-pw-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var inp = b.parentNode.querySelector('input'), show = inp.type === 'password';
      inp.type = show ? 'text' : 'password'; b.setAttribute('aria-pressed', show); b.setAttribute('aria-label', show ? '비밀번호 가리기' : '비밀번호 보기');
    });
  });

  /* 하단 탭: 누르면 아이콘이 채워지는 애니메이션(0.46초)을 보여 준 뒤 이동 */
  $$('.ui-bnav__tab').forEach(function (t) {
    t.addEventListener('click', function (e) {
      if (t.classList.contains('is-active') || t.hasAttribute('data-todo')) return;
      if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      e.preventDefault();
      $$('.ui-bnav__tab.is-active').forEach(function (x) { x.classList.remove('is-active'); x.removeAttribute('aria-current'); });
      t.classList.add('is-active', 'is-picking'); t.setAttribute('aria-current', 'page');
      setTimeout(function () { location.href = t.href; }, 420);
    });
  });

  /* 알림 띠: data-toast="문구" */
  var toast = document.querySelector('.mo-toast'), timer;
  document.addEventListener('click', function (e) {
    var todo = e.target.closest('[data-todo]');
    if (todo) e.preventDefault();
    var t = e.target.closest('[data-toast]') || todo; if (!t || !toast) return;
    toast.querySelector('span').textContent = t.dataset.toast || '준비 중인 화면이에요';
    toast.classList.add('is-on'); clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('is-on'); }, 2400);
  });
})();
