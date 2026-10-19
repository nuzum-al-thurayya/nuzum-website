/**
 * استقبال طلبات «انضم إلينا» من موقع nuzumalthuraya.com
 *
 * يحفظ كل طلب سطراً في جدول Google Sheets الذي أُضيف إليه هذا الكود،
 * ويحفظ ملف الأعمال (PDF) في مجلد خاص في Google Drive، ويرسل إشعاراً إلى بريد الشركة.
 *
 * التركيب: افتح جدول Google Sheets جديداً ← Extensions ← Apps Script ← الصق هذا الكود ←
 * Deploy ← New deployment ← Web app (Execute as: Me، Who has access: Anyone) ← انسخ الرابط.
 */

const SHEET_NAME = 'طلبات الانضمام';
const FOLDER_NAME = 'ملفات أعمال المتقدمين - نظم الثريا';
const NOTIFY_EMAIL = 'info@nuzumalthuraya.com';
const MAX_BYTES = 10 * 1024 * 1024;
const HEADERS = ['التاريخ', 'الاسم', 'رقم الجوال', 'البريد الإلكتروني', 'المهنة', 'ملف الأعمال'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return reply_({ ok: true }); // حقل مخفي يملؤه البرامج الآلية فقط

    const name = clean_(d.name, 100);
    const phone = clean_(d.phone, 30);
    const email = clean_(d.email, 150);
    const profession = clean_(d.profession, 100);
    if (!name || !phone || !email || !profession || !d.fileData) return reply_({ ok: false, error: 'missing' });

    const bytes = Utilities.base64Decode(d.fileData);
    if (bytes.length > MAX_BYTES) return reply_({ ok: false, error: 'too_large' });
    // التحقق أن الملف PDF فعلاً من أول بايتات فيه (%PDF)
    if (!(bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46)) {
      return reply_({ ok: false, error: 'not_pdf' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const now = new Date();
      const stamp = Utilities.formatDate(now, 'Asia/Riyadh', 'yyyy-MM-dd HH-mm');
      const file = folder_().createFile(Utilities.newBlob(bytes, 'application/pdf', stamp + ' - ' + name + '.pdf'));
      sheet_().appendRow([now, name, "'" + phone, email, profession, file.getUrl()]);
    } finally {
      lock.releaseLock();
    }

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'طلب انضمام جديد: ' + name + ' (' + profession + ')',
      body: 'وصل طلب انضمام جديد من الموقع.\n\nالاسم: ' + name + '\nالجوال: ' + phone +
        '\nالبريد: ' + email + '\nالمهنة: ' + profession +
        '\n\nالطلبات كلها وملفات الأعمال في جدول «' + SHEET_NAME + '».',
    });

    return reply_({ ok: true });
  } catch (err) {
    console.error(err);
    return reply_({ ok: false, error: 'server' });
  }
}

/** يمنع تنفيذ النصوص كمعادلات في الجدول ويقصّها إلى طول معقول. */
function clean_(v, max) {
  let s = String(v || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.setRightToLeft(true);
  }
  return sh;
}

function folder_() {
  const it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** شغّل هذه الدالة مرة واحدة من محرر Apps Script لمنح الصلاحيات وإنشاء الجدول والمجلد. */
function setup() {
  sheet_();
  folder_();
}
