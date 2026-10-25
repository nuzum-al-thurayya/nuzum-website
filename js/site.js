// قائمة الجوال — مشتركة في كل الصفحات
(function () {
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('main-nav');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });
})();
