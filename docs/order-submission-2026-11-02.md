# إرسال الأوردر فعليًا + استقباله على Google Sheet — 2 نوفمبر 2026

بعد ما اتعمل تصنيف الأصناف حسب وحدة القياس وصفحة `/order`، اتكملت دورة الطلب:
بقى فيه **زر «إرسال الطلب للفريق»** بيبعت الطلب فعليًا، واستقبال جاهز على Google Sheet،
ومعاه **ورقة تأكيد للوحدات التقديرية** (٢٣ صنفًا).

> **تحديث لاحق في نفس اليوم:** الفلو بقى خطوتين — اختيار أولي في `/catalog` بلا
> كمية، ثم كميات إلزامية في خطوة المراجعة بـ `/order`. الـ API وشكل الـ payload
> والـ webhook والـ fallback **ما اتغيروش**؛ التفاصيل في
> `docs/two-step-order-2026-11-02.md`.

## إيه اللي اتضاف

1. **`app/api/order/route.ts`** — Endpoint على الموقع: `POST /api/order`.
   - بيتحقق من الطلب: الأصناف لازم تكون من الـ٦٩ صنف المعروفين، الكمية رقم موجب ≤ ٩٩٩٩٩٩،
     الاسم والهاتف مطلوبين، والنصوص تتطهّر وتتقصّ قبل أي إرسال (حد أقصى ٨٠٠٠ حرف للرسالة).
   - لو `ORDER_WEBHOOK_URL` متضبط: بيبعت الطلب لـ webhook كـ JSON ( timeout ٨ ثوانٍ )
     ويرجّع `{ ok: true, mode: "submitted", reference }`.
   - لو مش متضبط (الوضع الافتراضي): يرجّع `{ ok: false, mode: "fallback", reason: "not-configured" }`
     والواجهة بتفتح واتساب / البريد بنفس الطلب — **مفيش طلب بيضيع**.
   - `GET /api/order` يرجّع `{ configured: true|false }` للتحقق من الربط بعد النشر.
   - العنوان بييجي من متغير البيئة فقط (مش من الطلب) → مفيش SSRF، ولازم HTTPS
     (إلا `localhost` للاختبار المحلي). مفيش تخزين على القرص ولا تسجيل لبيانات العملاء على الموقع.
2. **واجهة `/order`**: الاسم والهاتف بقوا مطلوبين مع رسائل تحقق، وكل طلب له
   **رقم مرجعي** `NB-YYYYMMDD-XXXX` محفوظ مع المسودة محليًا ومدرج في رسالة واتساب/البريد.
   بعد الإرسال بيظهر تأكيد برقم الطلب + زر «ابدأ طلب جديد»، ولو الاستقبال مش متوصّل
   بيظهر تنبيه واضح إن الطلب جاهز على واتساب/البريد.
3. **`.env.example`** — المتغير الاختياري `ORDER_WEBHOOK_URL` (مفيش سر مطلوب للـ build).
4. **ملفات Drive جديدة** في نفس فولدر الجرد (الأصلي ما اتغيّرش):
   - [طلبات نايل بد — استقبال الأوردرات](https://docs.google.com/spreadsheets/d/1s8jDD-jxaEYKW3wGJkiE065uwojbZTRrECJvFueFhWc/edit?usp=drivesdk)
     — بالأعمدة الجاهزة، id: `1s8jDD-jxaEYKW3wGJkiE065uwojbZTRrECJvFueFhWc`.
   - [وحدات القياس المطلوب تأكيدها — ٢٣ صنفًا](https://docs.google.com/spreadsheets/d/1i8pmOug9T64boaG8gOdawiy3Dk1xP8WT1frTlN8K4Bg/edit?usp=drivesdk)
     — عمود «الوحدة المعتمدة» فاضي للفريق؛ أول ما يتأكد، نثبّت القيمة في
     `app/catalog/units.ts` (`source` يتحوّل من `family` لـ `sheet`) وتختفي علامة «تقديري».
   نسخ CSV من الملفين في `docs/order-inbox-template.csv` و`docs/units-to-confirm.csv`.

## تفعيل الاستقبال (مرة واحدة، من طرف صاحب العمل)

1. افتح شيت «طلبات نايل بد — استقبال الأوردرات» ← **Extensions → Apps Script**.
2. امسح أي كود والصق الكود التالي (غيّر `SHEET_ID` لو استخدمت شيت تاني):

```javascript
const SHEET_ID = '1s8jDD-jxaEYKW3wGJkiE065uwojbZTRrECJvFueFhWc';
const HEADERS = ['رقم الطلب','التاريخ (UTC)','اللغة','الاسم','الشركة / المصنع','الهاتف',
                 'ملاحظات عامة','الأصناف (الكمية بالوحدة)','نص الطلب الكامل','الحالة'];

function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); }
  catch (err) { return out({ ok: false, error: 'invalid json' }); }
  if (!data || !Array.isArray(data.lines) || !data.lines.length) {
    return out({ ok: false, error: 'empty order' });
  }

  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName('الطلبات') || ss.insertSheet('الطلبات');
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);

  // Idempotency: a retried submit with the same reference is not duplicated.
  if (sh.getLastRow() > 1) {
    const seen = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().flat();
    if (seen.indexOf(data.reference) !== -1) return out({ ok: true, duplicate: true });
  }

  const lines = data.lines.map(function (l) {
    return l.nameAr + ' — ' + l.qty + ' ' + l.unitLabelAr +
      (l.note ? ' (' + l.note + ')' : '');
  }).join('\n');

  sh.appendRow([
    data.reference || '', data.createdAt || new Date().toISOString(), data.lang || 'ar',
    (data.contact && data.contact.name) || '', (data.contact && data.contact.company) || '',
    (data.contact && data.contact.phone) || '', (data.contact && data.contact.notes) || '',
    lines, data.message || '', 'جديد'
  ]);

  return out({ ok: true, reference: data.reference });
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy → New deployment → Web app** — Execute as: **Me**، Who has access: **Anyone**،
   وافق على الصلاحيات وانسخ الـ **Web app URL** (بيخلص بـ `/exec`).
   > الرابط ده هو «مفتاح» الاستقبال: متشاركهوش علنًا، ومتحطّهوش في الكود أو في Git.
4. على Vercel: **Settings → Environment Variables** ضيف `ORDER_WEBHOOK_URL` بالرابط،
   وبعدين اعمل **Redeploy**. `NEXT_PUBLIC_SITE_URL` وغيره مش مطلوبين لل feature دي.
5. تحقق: افتح `https://YOUR-DOMAIN/api/order` لازم يرجّع `{"configured":true}`،
   وبعدين ابعت طلب تجريبي من `/order` واتأكد إنه ظهر في الشيت.

**لو حابب تستبدل Apps Script:** أي HTTPS endpoint يستقبل POST بـ JSON ويقاوم التكرار
(مثلاً Make / Zapier / CRM) هيشتغل بنفس الشكل — الموقع مش مرتبط بـ Google بالاسم.

## شكل الـ payload

```json
{
  "reference": "NB-20261102-4F2A",
  "createdAt": "2026-11-02T12:00:00.000Z",
  "lang": "ar",
  "contact": { "name": "...", "company": "...", "phone": "...", "notes": "..." },
  "lines": [{
    "id": "shasia-18-25", "qty": 12, "note": "…",
    "unit": "roll", "unitLabelAr": "رول", "unitLabelEn": "Roll",
    "nameAr": "شاسية 18×25", "nameEn": "Shasia 18×25",
    "group": "shasia", "source": "sheet"
  }],
  "message": "نص الطلب الجاهز …"
}
```

## الخصوصية والسياسة

- الموقع نفسه **ما بيخزّنش** بيانات العملاء على سيرفر: المسودة في `localStorage` على جهاز الزائر فقط،
  والإرسال بيروح لـ webhook اللي صاحب العمل ضبطه (أو واتساب/البريد اللي الزائر اختاره).
- مفيش أسعار ولا أرقام جرد داخلية في الطلب؛ المواصفات والتوافر والسعر بتتأكد مع الفريق.
- النشر من غير `ORDER_WEBHOOK_URL` يفضل شغّال ١٠٠٪ — الفرق بس إن الإرسال بيتم عبر واتساب/البريد.

## اختبار محلي

```sh
# غير مربوط
curl -s http://localhost:3000/api/order
# {"configured":false}
curl -s -X POST http://localhost:3000/api/order -H 'Content-Type: application/json' \
  -d '{"reference":"NB-TEST","lang":"ar","contact":{"name":"تست","phone":"01000000000"},
       "lines":[{"id":"glue","qty":3}],"message":"test"}'
# {"ok":false,"mode":"fallback","reason":"not-configured","reference":"NB-TEST"}

# مربوط بـ webhook محلي للاختبار
ORDER_WEBHOOK_URL=http://localhost:4000 npm run dev
```
