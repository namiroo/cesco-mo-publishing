/* 세스코 모바일 오피스 — 데이터 계층
 * 화면은 CescoData.load(화면ID) 하나만 부른다. 데이터 출처를 바꿀 때는 이 파일의 source() 한 곳만 바꾼다.
 *   지금: www/data/{화면ID}.json (서버로 열 때) · www/data/mock.js (파일을 바로 열 때 — 브라우저가 file:// 의 fetch 를 막음)
 *   나중: Supabase · 사내 API — 응답 모양은 가이드 「데이터 명세」와 같게
 * 상태 미리보기: 주소 뒤 ?state=loading | empty | error  (상태 화면 파일은 <body data-force-state="…">), ?delay=1500 은 응답을 늦춤
 */
window.CescoData = (function () {
  var q = new URLSearchParams(location.search);
  var forced = q.get('state') || document.body.getAttribute('data-force-state') || '';
  var delay = +q.get('delay') || 0;

  function source(id) {
    if (location.protocol === 'file:' || !window.fetch) {
      var m = window.CESCO_MOCK && window.CESCO_MOCK[id];
      return m ? Promise.resolve(JSON.parse(JSON.stringify(m))) : Promise.reject(new Error('데이터 없음: ' + id));
    }
    return fetch('../data/' + id + '.json', { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  function emptied(d) {   /* 빈 상태 미리보기: 목록만 비움 */
    Object.keys(d).forEach(function (k) { if (Array.isArray(d[k])) d[k] = []; });
    return d;
  }

  function load(id) {
    if (forced === 'loading') return new Promise(function () {});
    if (forced === 'error') return new Promise(function (_, no) { setTimeout(function () { no(new Error('시연용 오류')); }, delay); });
    return new Promise(function (ok) { setTimeout(ok, delay); })
      .then(function () { return source(id); })
      .then(function (d) { return forced === 'empty' ? emptied(d) : d; });
  }

  return { load: load, state: forced };
})();
