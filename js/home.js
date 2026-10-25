// سكربتات الصفحة الرئيسية: نموذج التواصل، ونموذج الانضمام، واختيار الخدمة من رابط صفحات الخدمات
(function () {
  var form = document.getElementById('lead');
  var s = document.getElementById('f-status');
  var btn = document.getElementById('f-send');
  function say(t) { s.hidden = false; s.textContent = t; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('f-name').value.trim();
    var phone = document.getElementById('f-phone').value.trim();
    if (!name || !phone || !document.getElementById('f-ok').checked) {
      say('أكمل الاسم ورقم الجوال ووافق على معالجة البيانات ثم أعد الإرسال.');
      return;
    }
    if (form.action.indexOf('FORMSPREE_ID') !== -1) {
      say('النموذج قيد التفعيل. راسلنا الآن على info@nuzumalthuraya.com');
      return;
    }
    btn.disabled = true;
    say('جارٍ الإرسال...');
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error();
        form.reset();
        say('وصلنا طلبك، وسنتواصل معك خلال يوم عمل واحد.');
      })
      .catch(function () {
        say('تعذّر الإرسال. حاول مرة أخرى أو راسلنا على info@nuzumalthuraya.com');
      })
      .finally(function () { btn.disabled = false; });
  });
})();
(function () {
  // رابط تطبيق Google Apps Script الذي يحفظ الطلبات في جدول Google Sheets
  var ENDPOINT = 'JOIN_ENDPOINT';
  var MAX = 10 * 1024 * 1024;
  var form = document.getElementById('join-form');
  var s = document.getElementById('j-status');
  var btn = document.getElementById('j-send');
  function say(t) { s.hidden = false; s.textContent = t; }
  function val(id) { return document.getElementById(id).value.trim(); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var file = document.getElementById('j-file').files[0];
    if (!val('j-name') || !val('j-phone') || !val('j-email') || !val('j-job') || !file || !document.getElementById('j-ok').checked) {
      say('أكمل كل الحقول وأرفق ملف الأعمال ووافق على حفظ البيانات، ثم أعد الإرسال.');
      return;
    }
    if (!/\.pdf$/i.test(file.name)) { say('ملف الأعمال يجب أن يكون بصيغة PDF.'); return; }
    if (file.size > MAX) { say('حجم الملف أكبر من 10 ميجابايت. صغّر الملف ثم أعد الإرسال.'); return; }
    if (ENDPOINT.indexOf('JOIN_ENDPOINT') !== -1) {
      say('استقبال طلبات الانضمام قيد التفعيل. أرسل ملفك الآن إلى info@nuzumalthuraya.com');
      return;
    }
    btn.disabled = true;
    say('جارٍ رفع الملف وإرسال الطلب...');
    var reader = new FileReader();
    reader.onload = function () {
      var data = {
        name: val('j-name'), phone: val('j-phone'), email: val('j-email'), profession: val('j-job'),
        website: form.website.value, fileName: file.name, fileData: String(reader.result).split(',')[1]
      };
      fetch(ENDPOINT, { method: 'POST', body: JSON.stringify(data) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (!res.ok) throw new Error(res.error);
          form.reset();
          say('وصلنا طلبك وملف أعمالك، وسنتواصل معك إن وجدنا مشروعاً يناسبك.');
        })
        .catch(function () {
          say('تعذّر الإرسال. حاول مرة أخرى أو أرسل ملفك إلى info@nuzumalthuraya.com');
        })
        .finally(function () { btn.disabled = false; });
    };
    reader.onerror = function () { btn.disabled = false; say('تعذّرت قراءة الملف. اختره مرة أخرى.'); };
    reader.readAsDataURL(file);
  });
})();
// يختار الخدمة في نموذج التواصل حين يصل الزائر من صفحة خدمة برابط مثل /?service=ad-campaigns#contact
(function () {
  var map = {"website-design": "تصميم موقع إلكتروني", "ecommerce": "متجر إلكتروني", "platforms": "برمجة منصة إلكترونية", "mobile-apps": "تطبيق جوال", "website-management": "إدارة المواقع والمتاجر", "ad-campaigns": "إدارة الحملات الإعلانية", "brand-identity": "اسم وهوية لبرنامج أو موقع", "content": "محتوى أو تصوير لبرنامج أو موقع", "build-and-own": "باقة «ابنِ وتملّك»"};
  var m = /[?&]service=([a-z-]+)/.exec(location.search);
  var sel = document.getElementById('f-svc');
  if (!m || !map[m[1]] || !sel) return;
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].text === map[m[1]]) { sel.selectedIndex = i; break; }
  }
})();
