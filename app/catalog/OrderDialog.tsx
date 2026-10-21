'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, MessageCircle, Minus, Plus, Trash2, X, AlertCircle, Send, ArrowUpRight, Info } from 'lucide-react';
import type { Lang, OrderDetails, OrderLineView, UnitId } from './order';
import {
  DETAILS_KEY,
  EMPTY_DETAILS,
  UNITS,
  buildOrderMessage,
  clampQty,
  hasValidPhone,
  todayIso,
  unitLabel,
} from './order';

type Errors = Partial<Record<keyof OrderDetails | 'empty', string>>;

function copyFor(lang: Lang) {
  const ar = lang === 'ar';
  return {
    kicker: ar ? 'خطوة أخيرة' : 'FINAL STEP',
    title: ar ? 'أرسل طلبك على واتساب' : 'Send your order on WhatsApp',
    intro: ar
      ? 'راجع الكميات واكتب بياناتك، وهنجهّز رسالة واتساب فيها كل تفاصيل الطلب. الطلب يتبعت رسميًا لما تدوس إرسال في واتساب.'
      : 'Check the quantities and add your details. We will prepare a WhatsApp message with the full order. The order is submitted when you press send in WhatsApp.',
    summaryTitle: ar ? 'أصناف الطلب' : 'Order items',
    detailsTitle: ar ? 'بيانات الطلب' : 'Order details',
    empty: ar ? 'مفيش أصناف في الطلب. اقفل النافذة واختار من الكتالوج الأول.' : 'Your order is empty. Close this window and pick items from the catalog first.',
    qty: ar ? 'الكمية' : 'Quantity',
    unit: ar ? 'الوحدة' : 'Unit',
    remove: ar ? 'حذف الصنف' : 'Remove item',
    name: ar ? 'اسم العميل' : 'Customer name',
    namePh: ar ? 'الاسم بالكامل' : 'Full name',
    factory: ar ? 'اسم المصنع' : 'Factory name',
    factoryPh: ar ? 'اسم المصنع أو الورشة' : 'Factory or workshop name',
    factoryTime: ar ? 'وقت المصنع' : 'Factory time',
    factoryTimeHint: ar ? 'مواعيد العمل أو الوقت المناسب للتواصل والاستلام' : 'Working hours or the best time to call and deliver',
    factoryTimePh: ar ? 'مثال: من ٩ ص إلى ٦ م — السبت للخميس' : 'e.g. 9 am to 6 pm, Saturday to Thursday',
    phone: ar ? 'رقم التواصل' : 'Contact number',
    phoneHint: ar ? 'رقم متاح على واتساب لتأكيد الطلب' : 'A number reachable on WhatsApp to confirm the order',
    phonePh: ar ? 'مثال: 010 90000676' : 'e.g. 010 90000676',
    pickup: ar ? 'ميعاد الاستلام المتوقع' : 'Expected pickup date',
    pickupHint: ar ? 'التاريخ اللي محتاج تستلم فيه — الفريق يأكد الموعد النهائي.' : 'The date you need it by — the team confirms the final schedule.',
    notes: ar ? 'ملاحظات إضافية (اختياري)' : 'Extra notes (optional)',
    notesPh: ar ? 'مقاسات، كثافة، ألوان، أو أي تفاصيل تانية' : 'Sizes, density, colours, or any other details',
    required: ar ? 'مطلوب' : 'Required',
    errName: ar ? 'اكتب اسم العميل.' : 'Enter the customer name.',
    errFactory: ar ? 'اكتب اسم المصنع.' : 'Enter the factory name.',
    errFactoryTime: ar ? 'اكتب وقت المصنع أو مواعيد العمل.' : 'Enter the factory time or working hours.',
    errPhone: ar ? 'اكتب رقم تواصل صحيح (٨ أرقام على الأقل).' : 'Enter a valid contact number (at least 8 digits).',
    errPickup: ar ? 'اختار ميعاد الاستلام المتوقع.' : 'Choose the expected pickup date.',
    errPickupPast: ar ? 'ميعاد الاستلام لازم يكون اليوم أو بعده.' : 'The pickup date must be today or later.',
    errEmpty: ar ? 'ضيف صنف واحد على الأقل قبل الإرسال.' : 'Add at least one item before sending.',
    send: ar ? 'إرسال الطلب على واتساب' : 'Send order on WhatsApp',
    total: ar ? 'إجمالي الأصناف' : 'Total items',
    note: ar ? 'الأسعار والمواصفات النهائية تُؤكَّد مع الفريق. مفيش دفع أو تخزين على الموقع.' : 'Prices and final specs are confirmed with the team. No payment or storage happens on this site.',
    successTitle: ar ? 'رسالة الطلب جاهزة في واتساب' : 'Your order message is ready in WhatsApp',
    successBody: ar
      ? 'فتحنا واتساب برسالة فيها بياناتك وتفاصيل الطلب. دوس إرسال في واتساب عشان يوصل لفريق نايل بد — الموقع مش بيخزّن الطلب.'
      : 'We opened WhatsApp with your details and the full order. Press send in WhatsApp to reach the Nile Bed team — this site does not store the order.',
    reopen: ar ? 'فتح واتساب تاني' : 'Open WhatsApp again',
    backToCart: ar ? 'رجوع لتعديل الطلب' : 'Back to edit the order',
    clear: ar ? 'تفريغ الطلب' : 'Clear order',
    close: ar ? 'إغلاق' : 'Close',
    maxQty: ar ? 'أقصى كمية 100,000' : 'Maximum quantity is 100,000',
    invalid: ar ? 'راجع الحقول المطلوبة.' : 'Please check the required fields.',
    counter: (n: number) => (ar ? `${n} صنف` : `${n} ${n === 1 ? 'item' : 'items'}`),
  };
}

type Props = {
  open: boolean;
  lang: Lang;
  lines: OrderLineView[];
  onClose: () => void;
  onQtyChange: (id: string, qty: number) => void;
  onUnitChange: (id: string, unit: UnitId) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  waNumber: string;
};

export default function OrderDialog({
  open,
  lang,
  lines,
  onClose,
  onQtyChange,
  onUnitChange,
  onRemove,
  onClear,
  waNumber,
}: Props) {
  const ar = lang === 'ar';
  const t = useMemo(() => copyFor(lang), [lang]);
  const [details, setDetails] = useState<OrderDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [href, setHref] = useState('');
  const [origin, setOrigin] = useState('');
  const [today, setToday] = useState('');
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const fieldRefs = useRef<Partial<Record<keyof OrderDetails, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  // Load saved customer details and today's date once the dialog is opened.
  useEffect(() => {
    if (!open) return;
    setOrigin(window.location.origin);
    setToday(todayIso());
    setSent(false);
    setErrors({});
    setDetailsLoaded(false);
    try {
      const raw = localStorage.getItem(DETAILS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<OrderDetails>;
          setDetails({
          customerName: parsed.customerName ?? '',
          factoryName: parsed.factoryName ?? '',
          factoryTime: parsed.factoryTime ?? '',
          phone: parsed.phone ?? '',
          pickupDate: parsed.pickupDate ?? '',
          notes: parsed.notes ?? '',
        });
      }
    } catch {}
    setDetailsLoaded(true);
  }, [open]);

  // Persist the details locally (never sent anywhere by the site itself).
  useEffect(() => {
    if (!open || !detailsLoaded) return;
    try {
      localStorage.setItem(DETAILS_KEY, JSON.stringify(details));
    } catch {}
  }, [details, open, detailsLoaded]);

  // Focus trap-lite: move focus in, restore it on close, lock page scroll,
  // and close on Escape.
  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      const body = dialogRef.current?.querySelector('.order-scroll');
      if (body) body.scrollTop = 0;
      dialogRef.current?.focus();
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const setField = (key: keyof OrderDetails) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDetails((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!details.customerName.trim()) next.customerName = t.errName;
    if (!details.factoryName.trim()) next.factoryName = t.errFactory;
    if (!details.factoryTime.trim()) next.factoryTime = t.errFactoryTime;
    if (!hasValidPhone(details.phone)) next.phone = t.errPhone;
    if (!details.pickupDate) next.pickupDate = t.errPickup;
    else if (today && details.pickupDate < today) next.pickupDate = t.errPickupPast;
    if (lines.length === 0) next.empty = t.errEmpty;
    return next;
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    const keys = Object.keys(next) as (keyof Errors)[];
    if (keys.length > 0) {
      setErrors(next);
      const first = keys.find((key) => key !== 'empty') as keyof OrderDetails | undefined;
      const field = first ? fieldRefs.current[first] : null;
      field?.focus();
      field?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    const message = buildOrderMessage({ lines, details, lang, origin });
    const link = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    setHref(link);
    setSent(true);
    // Open inside the submit gesture so the popup is not blocked. The success
    // panel keeps a plain link as a fallback.
    const win = window.open(link, '_blank', 'noopener,noreferrer');
    if (!win) {
      // Popup blocked — the success panel link is the fallback, nothing else to do.
    }
  };

  const totalQty = lines.reduce((sum, line) => sum + line.qty, 0);
  const mixedUnits = new Set(lines.map((line) => line.unit)).size > 1;

  const errorId = (key: keyof OrderDetails) => (errors[key] ? `order-error-${key}` : undefined);

  return (
    <div className="order-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        className="order-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-dialog-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <header className="order-head">
          <div>
            <div className="section-label"><span>—</span>{t.kicker}</div>
            <h2 id="order-dialog-title">{sent ? t.successTitle : t.title}</h2>
          </div>
          <button className="order-close" type="button" onClick={onClose} aria-label={t.close}><X size={18} /></button>
        </header>

        {sent ? (
          <div className="order-success">
            <span className="order-success-icon"><Check size={26} /></span>
            <p>{t.successBody}</p>
            <div className="order-success-actions">
              <a className="button button-copper" href={href} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} />{t.reopen}
              </a>
              <button className="button order-ghost-btn" type="button" onClick={() => setSent(false)}>{t.backToCart}</button>
            </div>
            <button className="order-link-btn" type="button" onClick={() => { onClear(); onClose(); }}>
              <Trash2 size={14} />{t.clear}
            </button>
          </div>
        ) : (
          <form className="order-form" onSubmit={submit} noValidate>
            <div className="order-scroll">
              {lines.length === 0 ? (
                <p className="order-empty"><AlertCircle size={18} />{t.empty}</p>
              ) : (
                <section className="order-lines" aria-labelledby="order-lines-title">
                  <h3 id="order-lines-title">{t.summaryTitle} <span>{t.counter(lines.length)}</span></h3>
                  <ul>
                    {lines.map((line) => {
                      const name = ar ? line.item.ar.name : line.item.en.name;
                      const specs = ar ? line.item.ar.specs : line.item.en.specs;
                      return (
                        <li key={line.item.id} className="order-line">
                          <div className="order-line-main">
                            <div className="order-line-text">
                              <strong>{name}</strong>
                              {specs[0] && <small>{specs[0]}</small>}
                            </div>
                            <button className="order-line-remove" type="button" onClick={() => onRemove(line.item.id)} aria-label={`${t.remove}: ${name}`}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="order-line-controls">
                            <div className="qty-control" role="group" aria-label={`${t.qty} — ${name}`}>
                              <button type="button" onClick={() => onQtyChange(line.item.id, clampQty(line.qty - 1))} disabled={line.qty <= 1} aria-label={ar ? 'تقليل الكمية' : 'Decrease quantity'}><Minus size={13} /></button>
                              <input
                                type="number"
                                inputMode="numeric"
                                min={1}
                                max={100000}
                                step={1}
                                value={line.qty}
                                aria-label={`${t.qty} — ${name}`}
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  onQtyChange(line.item.id, Number.isFinite(value) && value > 0 ? Math.min(100000, Math.round(value)) : 1);
                                }}
                              />
                              <button type="button" onClick={() => onQtyChange(line.item.id, clampQty(line.qty + 1))} disabled={line.qty >= 100000} aria-label={ar ? 'زيادة الكمية' : 'Increase quantity'}><Plus size={13} /></button>
                            </div>
                            <label className="unit-select">
                              <span>{t.unit}</span>
                              <select value={line.unit} onChange={(e) => onUnitChange(line.item.id, e.target.value as UnitId)}>
                                {UNITS.map((unit) => <option key={unit.id} value={unit.id}>{unitLabel(unit.id, lang)}</option>)}
                              </select>
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="order-total">
                    <span>{t.total}</span>
                    <strong>{t.counter(lines.length)} · {totalQty.toLocaleString(ar ? 'ar-EG-u-nu-latn' : 'en-GB')} {mixedUnits ? '' : unitLabel(lines[0].unit, lang, totalQty)}</strong>
                  </div>
                  {errors.empty && <p className="order-error-summary" id="order-error-empty"><AlertCircle size={14} />{errors.empty}</p>}
                </section>
              )}

              <section className="order-details" aria-labelledby="order-details-title">
                <h3 id="order-details-title">{t.detailsTitle}</h3>
                <div className="order-grid">
                  <label className={`order-field ${errors.customerName ? 'has-error' : ''}`}>
                    <span>{t.name} <em>{t.required}</em></span>
                    <input
                      ref={(el) => { fieldRefs.current.customerName = el; }}
                      value={details.customerName}
                      onChange={setField('customerName')}
                      placeholder={t.namePh}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.customerName)}
                      aria-describedby={errorId('customerName')}
                      required
                    />
                    {errors.customerName && <small className="order-field-error" id="order-error-customerName">{errors.customerName}</small>}
                  </label>

                  <label className={`order-field ${errors.factoryName ? 'has-error' : ''}`}>
                    <span>{t.factory} <em>{t.required}</em></span>
                    <input
                      ref={(el) => { fieldRefs.current.factoryName = el; }}
                      value={details.factoryName}
                      onChange={setField('factoryName')}
                      placeholder={t.factoryPh}
                      autoComplete="organization"
                      aria-invalid={Boolean(errors.factoryName)}
                      aria-describedby={errorId('factoryName')}
                      required
                    />
                    {errors.factoryName && <small className="order-field-error" id="order-error-factoryName">{errors.factoryName}</small>}
                  </label>

                  <label className={`order-field ${errors.factoryTime ? 'has-error' : ''}`}>
                    <span>{t.factoryTime} <em>{t.required}</em></span>
                    <input
                      ref={(el) => { fieldRefs.current.factoryTime = el; }}
                      value={details.factoryTime}
                      onChange={setField('factoryTime')}
                      placeholder={t.factoryTimePh}
                      aria-invalid={Boolean(errors.factoryTime)}
                      aria-describedby={`order-hint-factoryTime${errors.factoryTime ? ' order-error-factoryTime' : ''}`}
                      required
                    />
                    <small className="order-field-hint" id="order-hint-factoryTime">{t.factoryTimeHint}</small>
                    {errors.factoryTime && <small className="order-field-error" id="order-error-factoryTime">{errors.factoryTime}</small>}
                  </label>

                  <label className={`order-field ${errors.phone ? 'has-error' : ''}`}>
                    <span>{t.phone} <em>{t.required}</em></span>
                    <input
                      ref={(el) => { fieldRefs.current.phone = el; }}
                      type="tel"
                      inputMode="tel"
                      dir="ltr"
                      value={details.phone}
                      onChange={setField('phone')}
                      placeholder={t.phonePh}
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={`order-hint-phone${errors.phone ? ' order-error-phone' : ''}`}
                      required
                    />
                    <small className="order-field-hint" id="order-hint-phone">{t.phoneHint}</small>
                    {errors.phone && <small className="order-field-error" id="order-error-phone">{errors.phone}</small>}
                  </label>

                  <label className={`order-field ${errors.pickupDate ? 'has-error' : ''}`}>
                    <span>{t.pickup} <em>{t.required}</em></span>
                    <input
                      ref={(el) => { fieldRefs.current.pickupDate = el; }}
                      type="date"
                      value={details.pickupDate}
                      min={today || undefined}
                      onChange={setField('pickupDate')}
                      aria-invalid={Boolean(errors.pickupDate)}
                      aria-describedby={`order-hint-pickup${errors.pickupDate ? ' order-error-pickupDate' : ''}`}
                      required
                    />
                    <small className="order-field-hint" id="order-hint-pickup">{t.pickupHint}</small>
                    {errors.pickupDate && <small className="order-field-error" id="order-error-pickupDate">{errors.pickupDate}</small>}
                  </label>

                  <label className="order-field order-field-wide">
                    <span>{t.notes}</span>
                    <textarea
                      ref={(el) => { fieldRefs.current.notes = el; }}
                      value={details.notes}
                      onChange={setField('notes')}
                      placeholder={t.notesPh}
                      rows={3}
                    />
                  </label>
                </div>
              </section>
            </div>

            <footer className="order-foot">
              <div className="order-foot-note"><Info size={14} />{t.note}</div>
              <div className="order-foot-actions">
                <button className="order-link-btn" type="button" onClick={onClear} disabled={lines.length === 0}>
                  <Trash2 size={14} />{t.clear}
                </button>
                <button className="button button-copper order-send" type="submit">
                  <Send size={16} />
                  {t.send}
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </footer>
          </form>
        )}
      </div>
    </div>
  );
}
