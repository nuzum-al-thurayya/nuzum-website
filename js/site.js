// مشترك في كل الصفحات: قائمة الجوال، وشريط تقدم التمرير، وتمييز القسم الحالي في القائمة
(function () {
  var top = document.getElementById('top');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (!top || !burger || !nav) return;

  burger.addEventListener('click', function () {
    var open = top.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { top.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && top.classList.contains('open')) { top.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.focus(); }
  });

  var links = [].slice.call(nav.querySelectorAll('a'));
  var secs = links.map(function (a) { var id = (a.getAttribute('href') || '').split('#')[1]; return id ? document.getElementById(id) : null; });
  function spy() {
    var h = document.documentElement, max = h.scrollHeight - window.innerHeight;
    top.style.setProperty('--sp', max > 0 ? Math.min(1, window.scrollY / max).toFixed(3) : 0);
    var mid = window.innerHeight * 0.4;
    links.forEach(function (a, i) {
      var s = secs[i], on = false;
      if (s) { var r = s.getBoundingClientRect(); on = r.top < mid && r.bottom > mid; }
      a.classList.toggle('cur', on);
    });
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy);
  spy();
})();
