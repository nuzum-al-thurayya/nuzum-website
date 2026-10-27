// الصفحة الرئيسية: الشريط المتحرك، ونجوم الثريا السبع، وسماء الواجهة، وخط آلية العمل، والنسخ، ونموذج التواصل
(function () {
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';
  function el(t, a) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function icon(id, cls) { var s = el('svg', { 'class': 'ic' + (cls ? ' ' + cls : ''), 'aria-hidden': 'true' }); s.appendChild(el('use', { href: '#' + id })); return s; }

  /* الشريط المتحرك */
  var words = ['تصميم المواقع', 'المتاجر الإلكترونية', 'برمجة المنصات', 'تطبيقات الجوال', 'تجربة المستخدم', 'إدارة المواقع', 'الحملات الإعلانية', 'الاسم والهوية', 'كتابة المحتوى', 'موشن جرافيك', 'ابنِ وتملّك'];
  var track = document.getElementById('track');
  if (track) {
    for (var c = 0; c < 2; c++) {
      var ul = document.createElement('ul');
      words.forEach(function (w) { var li = document.createElement('li'); li.textContent = w; li.appendChild(icon('star')); ul.appendChild(li); });
      track.appendChild(ul);
    }
  }

  /* نجوم الثريا السبع: كل نجمة خدمة من الركيزة الأولى، بترتيب الشعار 2-3-2 */
  var S = [
    { x: 198, y: 100, n: 'تصميم المواقع', d: 'موقع يعرّف بنشاطك ويستقبل طلبات عملائك.', u: 'website-design' },
    { x: 426, y: 100, n: 'المتاجر الإلكترونية', d: 'متجر يعرض منتجاتك ويستقبل الطلبات والدفع.', u: 'ecommerce' },
    { x: 90, y: 284, n: 'برمجة المنصات', d: 'منصة تشغّل نشاطك: حسابات وصلاحيات وعمليات.', u: 'platforms' },
    { x: 312, y: 284, n: 'تطبيقات الجوال', d: 'تطبيق لأجهزة iOS / Android بهويتك.', u: 'mobile-apps' },
    { x: 540, y: 284, n: 'تجربة المستخدم', d: 'واجهات واضحة تجعل استخدام المنتج سهلاً.', u: 'website-design' },
    { x: 198, y: 444, n: 'إدارة المواقع والمتاجر', d: 'تشغيل وتحديث ومتابعة بعد الإطلاق.', u: 'website-management' },
    { x: 426, y: 444, n: 'إدارة الحملات الإعلانية', d: 'Google · Snapchat · TikTok · Instagram · Facebook · X', u: 'ad-campaigns' }
  ];
  var E = [[0, 1], [0, 2], [0, 3], [0, 5], [1, 3], [1, 4], [1, 6], [2, 3], [2, 5], [3, 4], [3, 5], [3, 6], [4, 6], [5, 6]];
  var linksG = document.getElementById('links'), nodesG = document.getElementById('nodes'), detail = document.getElementById('detail');
  if (linksG && nodesG && detail) {
    var lk = E.map(function (p) { var l = el('line', { x1: S[p[0]].x, y1: S[p[0]].y, x2: S[p[1]].x, y2: S[p[1]].y, 'class': 'lnk' }); linksG.appendChild(l); return l; });
    var starD = 'M0-1C.09-.3.3-.09 1 0 .3.09.09.3 0 1-.09.3-.3.09-1 0-.3-.09-.09-.3 0-1Z';
    var dB = document.createElement('b'), dP = document.createElement('p'), dA = document.createElement('a');
    dA.setAttribute('aria-label', 'تعرّف على الخدمة');
    dA.appendChild(icon('arrow'));
    detail.appendChild(dB); detail.appendChild(dP); detail.appendChild(dA);
    var ng = S.map(function (s, i) {
      var g = el('g', { 'class': 'node', tabindex: '0', role: 'button', 'aria-label': s.n, transform: 'translate(' + s.x + ' ' + s.y + ')' });
      var b = el('g', { 'class': 'body' }), tw = el('g', { 'class': 'tw' });
      tw.appendChild(el('circle', { r: '58', 'class': 'halo' }));
      tw.appendChild(el('path', { d: starD, transform: 'scale(38)', 'class': 'st' }));
      tw.appendChild(el('circle', { r: '4', 'class': 'dot' }));
      b.appendChild(tw); g.appendChild(b);
      var t = el('text', { y: '72', 'class': 'nm' }); t.textContent = s.n; g.appendChild(t);
      g.addEventListener('mouseenter', function () { act(i); });
      g.addEventListener('focus', function () { act(i); });
      g.addEventListener('click', function () {
        act(i);
        if (RM) return;
        var r = el('circle', { r: '40', 'class': 'rp' }); g.appendChild(r);
        setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, 950);
      });
      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); window.location.href = '/services/' + s.u + '/'; }
        else if (e.key === ' ') { e.preventDefault(); act(i); }
      });
      nodesG.appendChild(g); return g;
    });
    function act(i) {
      ng.forEach(function (g, j) { g.classList.toggle('on', i === j); });
      lk.forEach(function (l, k) { l.classList.toggle('on', E[k][0] === i || E[k][1] === i); });
      dB.textContent = S[i].n; dP.textContent = S[i].d; dA.href = '/services/' + S[i].u + '/';
    }
    act(3);
  }

  /* سماء الواجهة: نجوم تتلألأ وتتصل بخيوط، وشهاب كل 6 إلى 12 ثانية، ونجوم تتبع المؤشر في الحاسب */
  var cv = document.getElementById('sky'), cx = cv && cv.getContext && cv.getContext('2d');
  var hero = document.getElementById('hero');
  if (cx && hero) {
    var SP = [], MT = null, nextM = 3500, lastSp = 0, W = 0, H = 0, P = [], mx = -999, my = -999, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var size = function () {
      var r = hero.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(W < 700 ? 34 : 70, W * H / 16000)); P = [];
      for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.6 + 1.2, vx: (Math.random() - .5) * .14, vy: (Math.random() - .5) * .14, t: Math.random() * 6.28, s: Math.random() * .02 + .006 });
    };
    var star = function (x, y, r, a) {
      cx.globalAlpha = a; cx.beginPath(); cx.moveTo(x, y - r * 2.4);
      cx.quadraticCurveTo(x + r * .25, y - r * .25, x + r * 2.4, y); cx.quadraticCurveTo(x + r * .25, y + r * .25, x, y + r * 2.4);
      cx.quadraticCurveTo(x - r * .25, y + r * .25, x - r * 2.4, y); cx.quadraticCurveTo(x - r * .25, y - r * .25, x, y - r * 2.4); cx.fill();
    };
    var visible = true;
    var draw = function () {
      cx.clearRect(0, 0, W, H);
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        if (!RM) { p.x += p.vx; p.y += p.vy; p.t += p.s; }
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10; if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        var dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 170) { cx.strokeStyle = 'rgba(110,198,216,' + (.5 * (1 - d / 170)) + ')'; cx.globalAlpha = 1; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(mx, my); cx.stroke(); }
        for (var j = i + 1; j < P.length; j++) {
          var q = P[j], ex = p.x - q.x, ey = p.y - q.y, e = ex * ex + ey * ey;
          if (e < 9000) { cx.strokeStyle = 'rgba(228,244,254,' + (.13 * (1 - e / 9000)) + ')'; cx.globalAlpha = 1; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); }
        }
        cx.fillStyle = d < 170 ? '#6EC6D8' : '#E4F4FE'; star(p.x, p.y, p.r, .35 + .4 * Math.abs(Math.sin(p.t)));
      }
      cx.fillStyle = '#6EC6D8';
      for (var s = SP.length - 1; s >= 0; s--) { var t = SP[s]; t.l -= .03; if (t.l <= 0) { SP.splice(s, 1); continue; } t.x += t.vx; t.y += t.vy; star(t.x, t.y, 2.4 * t.l + .5, t.l * .9); }
      if (!RM) {
        var now = performance.now();
        if (!MT && now > nextM) MT = { x: W * (.45 + Math.random() * .55), y: -10, vx: -9 - Math.random() * 4, vy: 4.4 + Math.random() * 2 };
        if (MT) {
          MT.x += MT.vx; MT.y += MT.vy;
          var ln = Math.sqrt(MT.vx * MT.vx + MT.vy * MT.vy), tx = MT.x - MT.vx / ln * 150, ty = MT.y - MT.vy / ln * 150;
          var gr = cx.createLinearGradient(tx, ty, MT.x, MT.y); gr.addColorStop(0, 'rgba(110,198,216,0)'); gr.addColorStop(1, 'rgba(228,244,254,.95)');
          cx.globalAlpha = 1; cx.strokeStyle = gr; cx.lineWidth = 2; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(tx, ty); cx.lineTo(MT.x, MT.y); cx.stroke();
          if (MT.x < -160 || MT.y > H + 60) { MT = null; nextM = now + 6000 + Math.random() * 6000; }
        }
      }
      cx.globalAlpha = 1;
      if (!RM && visible) requestAnimationFrame(draw);
    };
    size(); draw();
    if ('IntersectionObserver' in window && !RM) {
      new IntersectionObserver(function (en) { var was = visible; visible = en[0].isIntersecting; if (visible && !was) requestAnimationFrame(draw); }).observe(hero);
    }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (RM) draw(); }, 150); });
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
      var n = performance.now();
      if (!RM && e.pointerType === 'mouse' && n - lastSp > 45) { lastSp = n; SP.push({ x: mx, y: my, l: 1, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .2) * 1.2 }); }
    });
    hero.addEventListener('pointerleave', function () { mx = my = -999; });
  }

  /* خط آلية العمل: تضيء النجوم مع التمرير */
  var steps = document.getElementById('steps');
  if (steps) {
    var items = [].slice.call(steps.children);
    var prog = function () {
      var r = steps.getBoundingClientRect(), vh = window.innerHeight, p = (vh * .72 - r.top) / (r.height + vh * .1);
      p = Math.max(0, Math.min(1, p));
      steps.style.setProperty('--p', p.toFixed(3));
      items.forEach(function (s) { s.classList.toggle('on', s.getBoundingClientRect().top < vh * .74); });
    };
    window.addEventListener('scroll', prog, { passive: true }); window.addEventListener('resize', prog); prog();
  }

  /* أزرار النسخ */
  [].slice.call(document.querySelectorAll('[data-copy]')).forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-copy'), label = b.getAttribute('data-label') || b.textContent;
      function done() { b.textContent = 'تم النسخ'; setTimeout(function () { b.textContent = label; }, 1600); }
      function fallback() {
        var t = document.createElement('textarea'); t.value = v; t.setAttribute('readonly', ''); t.className = 'hp';
        document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); done(); } catch (e) { b.textContent = v; }
        document.body.removeChild(t);
      }
      try { navigator.clipboard.writeText(v).then(done, fallback); } catch (e) { fallback(); }
    });
  });

  /* نموذج التواصل: يُرسل إلى البريد عبر Formspree، أو عبر واتساب برسالة جاهزة */
  var form = document.getElementById('lead');
  if (form) {
    var send = document.getElementById('f-send'), wa = document.getElementById('f-wa'), hint = document.getElementById('f-status');
    var nameI = document.getElementById('f-name'), phoneI = document.getElementById('f-phone'), svcI = document.getElementById('f-svc'), msgI = document.getElementById('f-msg'), okI = document.getElementById('f-ok');
    var HINT = 'اكتب اسمك وجوالك، واختر الخدمة، ووافق على معالجة البيانات، ثم أرسل الطلب إلى بريدنا أو عبر واتساب.';
    var normPhone = function (p) {
      return p.replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).replace(/[\s\-()]/g, '').replace(/^(\+|00)?966/, '0').replace(/^5/, '05');
    };
    var state = function () {
      var n = nameI.value.trim(), p = phoneI.value.trim(), s = svcI.value, m = msgI.value.trim();
      var pv = /^05\d{8}$/.test(normPhone(p));
      return { n: n, p: p, s: s, m: m, pv: pv, ready: !!(n && s && okI.checked && pv) };
    };
    var build = function () {
      var st = state();
      var t = 'السلام عليكم، أنا ' + st.n + (st.pv ? '، جوالي ' + normPhone(st.p) : '') + '. أحتاج خدمة: ' + st.s + '.' + (st.m ? '\nتفاصيل المشروع: ' + st.m : '');
      wa.href = 'https://wa.me/966583379097?text=' + encodeURIComponent(t);
      send.setAttribute('aria-disabled', st.ready ? 'false' : 'true');
      wa.setAttribute('aria-disabled', st.ready ? 'false' : 'true');
      hint.classList.remove('ok');
      hint.textContent = st.ready ? 'جاهز. أرسل الطلب إلى بريدنا، أو افتح محادثة واتساب فيها طلبك.' : (st.p && !st.pv ? 'رقم الجوال غير صحيح. اكتبه بصيغة 05xxxxxxxx.' : HINT);
      return st;
    };
    form.addEventListener('input', build); form.addEventListener('change', build);
    wa.addEventListener('click', function (e) {
      if (wa.getAttribute('aria-disabled') === 'true') { e.preventDefault(); hint.textContent = 'أكمل الاسم والجوال بصيغة صحيحة، واختر الخدمة، ووافق على معالجة البيانات أولاً.'; }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var st = build();
      if (!st.ready) { hint.textContent = 'أكمل الاسم والجوال بصيغة صحيحة، واختر الخدمة، ووافق على معالجة البيانات أولاً.'; return; }
      send.setAttribute('aria-disabled', 'true');
      hint.textContent = 'جارٍ الإرسال...';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); form.reset(); build(); hint.textContent = 'وصلنا طلبك، وسنتواصل معك خلال يوم عمل واحد.'; hint.classList.add('ok'); })
        .catch(function () { build(); hint.textContent = 'تعذّر الإرسال. حاول مرة أخرى، أو أرسل الطلب عبر واتساب، أو راسلنا على info@nuzumalthuraya.com'; });
    });

    /* اختيار الخدمة تلقائياً حين يصل الزائر من صفحة خدمة برابط مثل /?service=ad-campaigns#contact */
    var map = { 'website-design': 'تصميم موقع إلكتروني', 'ecommerce': 'متجر إلكتروني', 'platforms': 'برمجة منصة إلكترونية', 'mobile-apps': 'تطبيق جوال', 'website-management': 'إدارة المواقع والمتاجر', 'ad-campaigns': 'إدارة الحملات الإعلانية', 'brand-identity': 'اسم وهوية لبرنامج أو موقع', 'content': 'محتوى أو تصوير لبرنامج أو موقع', 'build-and-own': 'باقة «ابنِ وتملّك»' };
    var m = /[?&]service=([a-z-]+)/.exec(location.search);
    if (m && map[m[1]]) {
      for (var i = 0; i < svcI.options.length; i++) { if (svcI.options[i].text === map[m[1]]) { svcI.selectedIndex = i; break; } }
    }
    build();
  }

  /* زر واتساب في «انضم إلينا» */
  var jw = document.getElementById('joinwa');
  if (jw) jw.href = 'https://wa.me/966583379097?text=' + encodeURIComponent('السلام عليكم، أرغب في الانضمام إلى فريق نظم الثريا. مهنتي: ');
})();
