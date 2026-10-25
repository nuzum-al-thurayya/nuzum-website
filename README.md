# موقع نظم الثريا

الموقع الرسمي لشركة نظم الثريا لتقنية المعلومات: https://nuzumalthuraya.com

موقع ثابت (HTML و CSS) يُنشر عبر GitHub Pages من الفرع `main`.

| الملف | المحتوى |
|---|---|
| `index.html` | الصفحة الرئيسية |
| `privacy.html` | سياسة الخصوصية |
| `terms.html` | الشروط والأحكام |
| `style.css` | التنسيق وألوان الهوية |
| `favicon.svg` و `favicon.ico` و `favicon-*.png` و `apple-touch-icon.png` | أيقونة الموقع في المتصفح ونتائج Google والجوال |
| `logo.png` | الشعار لنتائج البحث |
| `og-image.png` | الصورة التي تظهر عند مشاركة الرابط |
| `sitemap.xml` و `robots.txt` | خريطة الموقع وتعليمات محركات البحث |
| `CNAME` | ربط الموقع بالنطاق nuzumalthuraya.com |

نموذج التواصل يرسل إلى info@nuzumalthuraya.com عبر Formspree؛ معرّف النموذج `meaevegv` في `index.html`.

## طلبات «انضم إلينا»

تُحفظ في جدول Google Sheets باسم «طلبات الانضمام»، وملفات الأعمال في مجلد Google Drive، عبر الكود في `apps-script/join-requests.gs`.
رابط تطبيق Apps Script يوضع في `index.html` مكان `JOIN_ENDPOINT`. لتصدير الطلبات: من الجدول ← File ← Download ← Microsoft Excel.

## صفحات الخدمات

كل خدمة في مجلد مستقل: `services/<الخدمة>/index.html`. الترويسة والتذييل متطابقان حرفياً في كل الصفحات، ومحصوران بين تعليقَي «بداية/نهاية الترويسة المشتركة» و«بداية/نهاية التذييل المشترك»؛ أي تعديل فيهما يُنسخ إلى كل الصفحات.
زر التواصل في صفحة الخدمة يفتح `/?service=<الخدمة>#contact` فيختار الخدمة في النموذج تلقائياً.

## الأمان

كل صفحة تحمل سياسة أمان المحتوى (Content-Security-Policy) في وسم meta، لأن GitHub Pages لا يسمح بترويسات مخصصة.
لذلك لا يُكتب أي سكربت أو `style="..."` داخل HTML: السكربتات في `js/site.js` (القائمة، لكل الصفحات) و`js/home.js` (نماذج الرئيسية)، والأنماط في `style.css`.
عند إضافة خدمة خارجية جديدة (مثل رابط Apps Script لنموذج الانضمام: `https://script.google.com` و`https://script.googleusercontent.com`) أضف نطاقها إلى `connect-src` في وسم السياسة بكل الصفحات.
