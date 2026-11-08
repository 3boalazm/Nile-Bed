'use client';

/**
 * NILE BED — home.
 *
 * Rebuilt from the reference set. Every band below is a literal extraction:
 *
 *  · hero          → dark field + centred stacked headline + glass pill nav +
 *                    media plate whose bottom edge is overlapped by the sheet
 *  · sheet + bento → one wide photo tile, one ink tile, one accent tile
 *  · catalog rows  → hairline table rows with index numerals (editorial list)
 *  · node map      → 4 nutrient pills on dashed arcs around a glowing core
 *  · ink band      → the 1.2 cm number as the page's single loud statistic
 *  · advantages    → 01/02/03 cards with chip, corner arrow and a numeral that
 *                    is cropped by the card edge
 *  · partners      → two-up split, one paper one ink
 *  · contact       → floating light app-card on the dark field, pill submit
 *  · closing band  → full-bleed cinematic frame, serif line, pill field
 */

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Mail, MessageCircle, Package, Sparkles, Truck } from 'lucide-react';
import { groups, items } from './catalog/data';
import { Chrome, EMAIL, SiteFooter, WA, useLang } from './components/next/Chrome';

const copy = {
  ar: {
    eyebrow: 'دورة توريد متكاملة · مصر',
    eyebrowAccent: '٠١',
    titleA: 'كل اللي',
    titleB: 'يكمل',
    titleC: 'المرتبة.',
    sub: 'سوست نصنعها في مصر، وخامات مراتب نختارها بعناية، وشركاء نوصّلك بيهم للقماش والإسفنج. طريق توريد واحد مبني على احتياج مصنعك.',
    cta: 'استكشف الكتالوج',
    ctaAlt: 'راجع طلبك',
    plateTag: 'تصنيع سوست · مصر',
    plateTag2: 'هبوط ≤ 1.2 سم',

    whatKicker: 'نطاق عملنا',
    whatTitle: 'من سلك السوستة لآخر طبقة تكمل المرتبة.',
    whatText: 'نصنع السوست، ونورّد خامات المراتب، ونوصّل العميل بشركائنا للقماش والإسفنج. تواصل واحد — وكل منتج من قناة توريده المناسبة.',
    bento: [
      ['٠١', 'خامات تكمل شغلك', 'بوكيت، فوم، لاتكس، لباد، غراء وخيوط — المواصفات تُؤكَّد مع كل استفسار.'],
      ['٠٢', 'شبكة شركاء', 'القماش والإسفنج من شركائنا؛ نوصّلك بالشريك والبيع والتوريد مباشرة منه.'],
      ['٠٣', 'تصنيع مصري', 'سوست بونيل وفريم ورولات سلك 1.3 مم — نصنعها في مصر حسب طلبك.'],
    ],

    stripCaption: 'نصنّع ونورّد لصُنّاع المراتب في مصر',
    strip: ['سوست بونيل', 'فريم', 'شاسيهات', 'بوكيت', 'ميموري', 'لاتكس', 'لباد', 'خيوط'],
    catalogKicker: 'الكتالوج — باختصار',
    catalogTitle: 'كوّن قائمة التوريد المناسبة لخطك.',
    catalogText: 'أربع عائلات أساسية نصنّعها ونورّدها، والكتالوج الكامل فيه كل المقاسات والسماكات ولوازم التجميع — التوافر والشروط تُؤكَّد عند الاستفسار.',
    catalogCta: 'عرض الكتالوج الكامل',
    rowCta: 'الأصناف',

    mapKicker: 'خط التوريد',
    mapTitle: 'كل حلقة في مسار واحد واضح.',
    mapText: 'من السلك الخام لحد التغليف، كل مرحلة لها مصدر محدّد وفريق مسؤول — عشان تعرف بالظبط بتستلم إيه ومنين.',
    mapCaptionA: 'نايل بد · تصنيع وتوريد',
    mapCaptionB: 'مصر · ٢٠٢٦',
    nodes: [
      { t: 'سلك ومواد خام', s: 'سلك 1.3 مم · بونيل' },
      { t: 'تصنيع السوست', s: 'بونيل · فريم · شاسيه' },
      { t: 'شركاء القماش', s: 'توصيل مباشر للشريك' },
      { t: 'إسفنج وفوم', s: 'ميموري · لاتكس' },
    ],
    core: { t: 'نايل بد', s: 'نقطة التنسيق' },

    bandKicker: 'معيارنا',
    bandTitle: 'الجودة جزء من خطة التوريد.',
    bandText: 'السوست بتاعتنا بمعيار مقاس: نسبة الهبوط لا تتجاوز 1.2 سم، ومقاس كل وحدة بيتسلّم بقطر السلك والارتفاع وقطر السوستة المطلوبين بالظبط.',
    bandPoints: ['هبوط لا يتجاوز 1.2 سم', 'قطر السلك والارتفاع وقطر السوستة حسب المقاس', 'تأكيد قبل التوريد'],
    statValue: '1.2',
    statUnit: 'سم',
    statLabel: 'أقصى نسبة هبوط',
    statNote: 'رقم مقاس على كل سوستة نصنعها، مش وعد تسويقي — يُختبر ويُؤكَّد قبل التوريد.',
    sizesTitle: 'مقاسات متاحة',
    trustRow: 'مسار واحد لمصانع المراتب · تصنيع في مصر',
    trustAvatars: ['س', 'ف', 'ب', 'ل'],

    advKicker: 'كيف نورّد',
    advTitle: 'خطط كبيرة. اختيارات مرنة. ومواصفات واضحة.',
    advText: 'شاركنا الكمية والاستخدام والمواصفات الفنية، ونراجع معك الخيارات ونخطط للتوريد بما يحافظ على ثبات الجودة.',
    adv: [
      ['مرونة في المواصفات', 'قطر السلك والارتفاع وقطر السوستة يتحدّدوا على طلبك، مش على مقاس جاهز.'],
      ['مراجعة عند التخطيط', 'نراجع الكمية والاستخدام ونثبّت المواصفات قبل ما يبدأ التصنيع.'],
      ['نرحب بالطلبات الكبيرة', 'القدرة ومدة التوريد تُؤكَّدان لكل طلب قبل الثبات على ميعاد.'],
    ],

    partnersKicker: 'شبكة الشركاء',
    partnersTitle: 'أكثر من مجرّد طلب واحد.',
    partnersText: 'لصُنّاع المراتب — وللموردين المهتمين بالجودة. سواء تحتاج قماش وإسفنج، أو عندك منتج يستحق أن يعرفه صُنّاع المراتب، نوصّلك بالطريق الصحيح.',
    supplierTitle: 'محتاج قماش أو إسفنج؟',
    supplierBody: 'احكيلنا بتدوّر على إيه — ونوصّلك بشريك من شبكتنا عشان تشتري بسعر مميز جدًا.',
    supplierCta: 'اعرف شريكك',
    importTitle: 'عندك منتج تريد توريده؟',
    importBody: 'لو بتقدّم جودة ثابتة وأسعار منافسة وتوريد يعتمد عليه — عرّفنا بمنتجك ومصدره وقدرتك.',
    importCta: 'عرّفنا بمنتجك',

    contactKicker: 'التواصل وطلب عرض سعر',
    contactTitle: 'ابدأ بالتفاصيل.',
    contactText: 'تواصل مع نايل بد عبر البريد أو واتساب. النموذج ده للمعاينة فقط — لا يرسل ولا يخزّن البيانات.',
    fields: ['الاسم الكامل', 'الشركة', 'البريد للتواصل', 'المنتج المطلوب'],
    notes: 'المواصفات / ملاحظات',
    notesHint: 'مثال: سوستة 2.4 مم، ارتفاع 16.5 سم، 10,000 وحدة',
    productHint: 'اختر فئة المنتج',
    submit: 'جهّز الاستفسار',
    formNote: 'معاينة فقط — استخدم البريد أو واتساب بجوار النموذج.',
    waLabel: 'واتساب',
    mailLabel: 'البريد الإلكتروني',
    callLabel: 'اتصال',

    closeTitle: 'كل مرتبة كويسة تبدأ من سوستة مضبوطة.',
    closeSub: 'اختار من الكتالوج، وحدّد الكمية، وإحنا نأكّد المواصفة ومسار التوريد معاك.',
    closeCta: 'ابدأ الاختيار',
    closePlaceholder: 'اكتب اسم الشركة أو الكمية المطلوبة…',
  },
  en: {
    eyebrow: 'One coordinated supply cycle · Egypt',
    eyebrowAccent: '01',
    titleA: 'Everything',
    titleB: 'behind your',
    titleC: 'next mattress.',
    sub: 'Springs we manufacture in Egypt, materials we source carefully, and a partner network for fabric & sponge. One supply route, built around your line.',
    cta: 'Explore the catalog',
    ctaAlt: 'Review an order',
    plateTag: 'Spring manufacturing · Egypt',
    plateTag2: 'Sag ≤ 1.2 cm',

    whatKicker: 'What we do',
    whatTitle: 'From spring wire to the finishing layers.',
    whatText: 'We make springs, supply mattress materials, and connect you with partner suppliers for fabric and sponge. One conversation — the right channel for each product.',
    bento: [
      ['01', 'Materials that finish the job', 'Pocket, foam, latex, felt, glue and threads — specs confirmed on every enquiry.'],
      ['02', 'Partner network', 'Fabric and sponge via our partners; we introduce, the partner supplies.'],
      ['03', 'Made in Egypt', 'Bonnell springs, frames and 1.3 mm wire rolls — manufactured to your order.'],
    ],

    stripCaption: 'Made and supplied for mattress makers in Egypt',
    strip: ['Bonnell', 'Frames', 'Units', 'Pocket', 'Memory', 'Latex', 'Felt', 'Threads'],
    catalogKicker: 'The catalog — brief',
    catalogTitle: 'Build the supply list that fits your line.',
    catalogText: 'Four essential families we make and supply. The full catalog covers every size, thickness and fastener — availability and terms confirmed on enquiry.',
    catalogCta: 'View full catalog',
    rowCta: 'items',

    mapKicker: 'Supply chain',
    mapTitle: 'Every link on one clear route.',
    mapText: 'From raw wire to the finishing layer, each stage has a defined source and a responsible team — so you know exactly what arrives and from where.',
    mapCaptionA: 'Nile Bed · make & supply',
    mapCaptionB: 'Egypt · 2026',
    nodes: [
      { t: 'Wire & raw stock', s: '1.3 mm wire · Bonnell' },
      { t: 'Spring production', s: 'Bonnell · frames · units' },
      { t: 'Fabric partners', s: 'Direct partner supply' },
      { t: 'Foam & latex', s: 'Memory · latex' },
    ],
    core: { t: 'Nile Bed', s: 'Coordination point' },

    bandKicker: 'Our standard',
    bandTitle: 'Quality is built into the supply plan.',
    bandText: 'Our springs are made to a measurable standard: sag is no more than 1.2 cm, and every unit ships at exactly the wire gauge, height and coil diameter you asked for.',
    bandPoints: ['Sag no more than 1.2 cm', 'Wire, height & diameter as specified', 'Confirmed before supply'],
    statValue: '1.2',
    statUnit: 'cm',
    statLabel: 'maximum sag',
    statNote: 'A measured number on every spring we make — tested and confirmed before supply, not a marketing line.',
    sizesTitle: 'Available sizes',
    trustRow: 'One route for mattress makers · made in Egypt',
    trustAvatars: ['SP', 'FR', 'PK', 'LT'],

    advKicker: 'How we supply',
    advTitle: 'Large plans. Flexible choices. Clear specs.',
    advText: 'Share your quantity, application and technical needs. We review the options and plan supply to protect consistency.',
    adv: [
      ['Flexible specifications', 'Wire gauge, height and coil diameter follow your order, not a fixed catalogue size.'],
      ['Reviewed at planning', 'Quantity and application reviewed, specs locked before production starts.'],
      ['Large volumes welcome', 'Capacity and lead time confirmed per brief, before any date is fixed.'],
    ],

    partnersKicker: 'Partner network',
    partnersTitle: 'More than a one-off order.',
    partnersText: 'For mattress makers — and for quality-focused suppliers. Whether you need fabric & sponge, or you supply a product mattress makers should know about, we make the right introduction.',
    supplierTitle: 'Need fabric or sponge?',
    supplierBody: 'Tell us what you are looking for — we connect you with a partner so you can buy at a special price.',
    supplierCta: 'Find a partner',
    importTitle: 'Have a product to supply?',
    importBody: 'If you offer consistent quality, competitive terms and reliable supply — tell us about your product, origin and capacity.',
    importCta: 'Introduce your product',

    contactKicker: 'Contact & RFQ',
    contactTitle: 'Start with the details.',
    contactText: 'Contact Nile Bed directly via email or WhatsApp. This form is a preview — it does not submit or store information.',
    fields: ['Full name', 'Company', 'Business email', 'Product of interest'],
    notes: 'Technical requirements / notes',
    notesHint: 'e.g. 2.4 mm spring, 16.5 cm height, 10,000 units',
    productHint: 'Select a product family',
    submit: 'Prepare enquiry',
    formNote: 'Preview only — use email or WhatsApp beside the form.',
    waLabel: 'WhatsApp',
    mailLabel: 'Email',
    callLabel: 'Call',

    closeTitle: 'Every good mattress starts with a spring that holds.',
    closeSub: 'Choose from the catalog, set your quantity, and we confirm the spec and the supply route with you.',
    closeCta: 'Start selecting',
    closePlaceholder: 'Company name or quantity…',
  },
} as const;

const featured = [
  {
    img: '/images/nx-bento-wire.jpg',
    group: 'springs',
    kickerAr: 'تصنيع نايل بد',
    kickerEn: 'MADE BY NILE BED',
    titleAr: 'السوست والفريم والسلك',
    titleEn: 'Springs, Frames & Wire',
    descAr: 'سوست بونيل 2.05–2.4 مم بارتفاع 14.5–16.5 سم، وفريم 4.5 و5، ورول سلك 1.3 — تصنيع حسب الطلب.',
    descEn: 'Bonnell springs 2.05–2.4 mm at 14.5–16.5 cm, frames 4.5 & 5, 1.3 mm wire rolls — made to order.',
    href: '/catalog#springs',
  },
  {
    img: '/catalog/pocket/pocket-roll.jpg',
    group: 'pocket',
    kickerAr: 'رول ومفروش',
    kickerEn: 'POCKET',
    titleAr: 'البوكيت — رول ومفروش',
    titleEn: 'Pocket — Rolls & Ready',
    descAr: 'رولات 12–18 سم، ومفروش جاهز 80×25 إلى 80×32 — الكثافة والمقاس يُؤكَّدان مع الفريق.',
    descEn: 'Rolls 12–18 cm, ready-spread 80×25 to 80×32 — density & size confirmed per enquiry.',
    href: '/catalog#pocket',
  },
  {
    img: '/catalog/foam/memory-rolls.jpg',
    group: 'foam',
    kickerAr: 'تركي وشرق آسيا',
    kickerEn: 'TURKEY & EAST ASIA',
    titleAr: 'ميموري ولاتكس وخام مراتب',
    titleEn: 'Memory, Latex & Cores',
    descAr: 'ميموري تركي 2 و4 سم، ولاتكس 2.5–5 سم، وخام لاتكس 15 و18 سم — توريد خام فقط.',
    descEn: 'Turkish memory 2 & 4 cm, neutral latex 2.5–5 cm, latex cores 15 & 18 cm — material only.',
    href: '/catalog#foam',
  },
  {
    img: '/catalog/materials/felt-rolls.jpg',
    group: 'materials',
    kickerAr: 'لباد وفازلين وخيوط',
    kickerEn: 'FELT & THREADS',
    titleAr: 'لباد ومستلزمات إنتاج',
    titleEn: 'Felt & Production Supplies',
    descAr: 'لباد بجميع درجاته، فازلين وميلتون، خيوط كابوتينية وتيب 3D ولوازم تجميع وغراء.',
    descEn: 'Felt in all shades, non-woven & Melton, quilting threads, 3D tape, fasteners & glue.',
    href: '/catalog#materials',
  },
] as const;

export default function Home() {
  const [lang, setLang] = useLang();
  const [formReady, setFormReady] = useState(false);
  const ar = lang === 'ar';
  const t = copy[lang];

  const countByGroup = useMemo(
    () => (id: string) => items.filter((it) => it.group === id).length,
    [],
  );

  return (
    <main className="nx" dir={ar ? 'rtl' : 'ltr'} lang={lang} id="top">
      <Chrome lang={lang} onLang={setLang} page="home" />

      {/* ── hero: dark field, centred headline, media plate ─────────────── */}
      <section className="nx-hero">
        <div className="nx-wrap">
          <div className="nx-hero-copy">
            <span className="nx-eyebrow">
              <b>{t.eyebrowAccent}</b>
              {t.eyebrow}
              <i aria-hidden="true" />
            </span>
            <h1 className="nx-h1">
              {t.titleA} <span className="nx-hero-mark">{t.titleB}</span>
              <br />
              {t.titleC}
            </h1>
            <p className="nx-hero-sub">{t.sub}</p>
            <div className="nx-hero-actions">
              <a className="nx-btn nx-btn-solid" href="/catalog">
                {t.cta} <ArrowUpRight size={15} />
              </a>
              <a className="nx-btn nx-hero-ghost" href="/order">
                {t.ctaAlt} <ArrowRight size={15} />
              </a>
            </div>
            <div className="nx-trust">
              <span className="nx-trust-avatars" aria-hidden="true">
                {t.trustAvatars.map((a) => <span key={a}>{a}</span>)}
              </span>
              <small>{t.trustRow}</small>
            </div>
          </div>
        </div>

        <div className="nx-hero-plate">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nx-hero-springs.jpg" alt={ar ? 'صفوف سوست بونيل متجاورة بإضاءة نحاسية' : 'Rows of bonnell springs under warm copper light'} width={1536} height={1024} />
          <span className="nx-plate-tag is-tr">{t.plateTag}</span>
          <span className="nx-plate-tag is-bl"><i aria-hidden="true" />{t.plateTag2}</span>
        </div>
      </section>

      {/* ── sheet riding on the band: intro + bento ─────────────────────── */}
      <section className="nx-sheet" id="scope" aria-labelledby="nx-what">
        <div className="nx-sheet-head">
          <div>
            <span className="nx-eyebrow"><b>٠١</b>{t.whatKicker}</span>
            <h2 className="nx-h2" id="nx-what">{t.whatTitle}</h2>
          </div>
          <p className="nx-lead">{t.whatText}</p>
        </div>

        <div className="nx-bento">
          <article className="nx-tile is-photo">
            <span className="nx-tile-num">{t.bento[0][0]}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nx-bento-materials.jpg" alt={ar ? 'رول لباد وطبقات إسفنج على ورقة كريمية' : 'Felt roll and foam layers on cream paper'} width={1536} height={1024} />
            <h3>{t.bento[0][1]}</h3>
            <p>{t.bento[0][2]}</p>
          </article>

          <article className="nx-tile is-ink">
            <span className="nx-tile-num">{t.bento[1][0]}</span>
            <span className="nx-tile-arrow" aria-hidden="true"><ArrowUpRight size={15} /></span>
            <h3>{t.bento[1][1]}</h3>
            <p>{t.bento[1][2]}</p>
          </article>

          <article className="nx-tile is-accent">
            <span className="nx-tile-num">{t.bento[2][0]}</span>
            <span className="nx-tile-arrow" aria-hidden="true"><ArrowUpRight size={15} /></span>
            <h3>{t.bento[2][1]}</h3>
            <p>{t.bento[2][2]}</p>
          </article>
        </div>
      </section>

      {/* ── caption + marks strip (the reference logo row, honestly sourced) ── */}
      <section className="nx-strip" aria-label={t.stripCaption}>
        <div className="nx-wrap nx-strip-inner">
          <span className="nx-strip-caption">{t.stripCaption}</span>
          <div className="nx-strip-marks">
            {t.strip.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── catalog as editorial rows ───────────────────────────────────── */}
      <section className="nx-section" id="catalog">
        <div className="nx-wrap">
          <div className="nx-sheet-head">
            <div>
              <span className="nx-eyebrow"><b>٠٢</b>{t.catalogKicker}</span>
              <h2 className="nx-h2">{t.catalogTitle}</h2>
            </div>
            <p className="nx-lead">{t.catalogText}</p>
          </div>

          <div className="nx-rows">
            {featured.map((f, i) => (
              <a className="nx-row" key={f.group} href={f.href}>
                <span className="nx-row-index">{ar ? ['٠١', '٠٢', '٠٣', '٠٤'][i] : `0${i + 1}`}</span>
                <span className="nx-row-title">
                  <strong>{ar ? f.titleAr : f.titleEn}</strong>
                  <small>{ar ? f.kickerAr : f.kickerEn}</small>
                </span>
                <span className="nx-row-meta">{ar ? f.descAr : f.descEn}</span>
                <span className="nx-row-end">
                  <span className="nx-row-count">
                    {countByGroup(f.group)} {t.rowCta}
                  </span>
                  <span className="nx-row-go" aria-hidden="true"><ArrowUpRight size={15} /></span>
                </span>
              </a>
            ))}
          </div>

          <div className="nx-rows-foot">
            <a className="nx-btn nx-btn-ink" href="/catalog">
              {t.catalogCta} <ArrowUpRight size={15} />
            </a>
            <span className="nx-note">{items.length} {ar ? 'صنف' : 'items'} · {groups.length} {ar ? 'مجموعات' : 'groups'}</span>
          </div>
        </div>
      </section>

      {/* ── node map ────────────────────────────────────────────────────── */}
      <section className="nx-section" id="chain" style={{ paddingTop: 0 }}>
        <div className="nx-wrap">
          <div className="nx-sheet-head">
            <div>
              <span className="nx-eyebrow"><b>٠٣</b>{t.mapKicker}</span>
              <h2 className="nx-h2">{t.mapTitle}</h2>
            </div>
            <p className="nx-lead">{t.mapText}</p>
          </div>

          <div className="nx-map" style={{ marginTop: 'clamp(20px, 2.6vw, 30px)' }}>
            <svg className="nx-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" fill="none">
              <path d="M22 32 Q34 36 46 48" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d="M78 32 Q66 36 54 48" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d="M20 72 Q33 64 46 53" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
              <path d="M80 72 Q67 64 54 53" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
              <path d="M22 32 Q50 8 78 32" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" opacity=".7" />
              <path d="M20 72 Q50 94 80 72" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" opacity=".7" />
            </svg>

            <span className="nx-node is-muted nx-node-a">
              <span className="nx-node-icon" aria-hidden="true"><Package size={16} /></span>
              <span><strong>{t.nodes[0].t}</strong><small>{t.nodes[0].s}</small></span>
            </span>
            <span className="nx-node is-muted nx-node-b">
              <span className="nx-node-icon" aria-hidden="true"><Sparkles size={16} /></span>
              <span><strong>{t.nodes[1].t}</strong><small>{t.nodes[1].s}</small></span>
            </span>
            <span className="nx-node is-core nx-node-core">
              <span className="nx-node-icon" aria-hidden="true"><Check size={16} /></span>
              <span><strong>{t.core.t}</strong><small>{t.core.s}</small></span>
            </span>
            <span className="nx-node is-muted nx-node-c">
              <span className="nx-node-icon" aria-hidden="true"><ArrowUpRight size={16} /></span>
              <span><strong>{t.nodes[2].t}</strong><small>{t.nodes[2].s}</small></span>
            </span>
            <span className="nx-node is-muted nx-node-d">
              <span className="nx-node-icon" aria-hidden="true"><Truck size={16} /></span>
              <span><strong>{t.nodes[3].t}</strong><small>{t.nodes[3].s}</small></span>
            </span>

            <span className="nx-map-caption is-bl">{t.mapCaptionA}<i aria-hidden="true" /></span>
            <span className="nx-map-caption is-br">{t.mapCaptionB}<i aria-hidden="true" /></span>
          </div>
        </div>
      </section>

      {/* ── ink band: the single loud statistic ─────────────────────────── */}
      <section className="nx-band" id="standard">
        <div className="nx-wrap nx-band-inner">
          <div>
            <span className="nx-eyebrow"><b>٠٤</b>{t.bandKicker}</span>
            <h2 className="nx-h2">{t.bandTitle}</h2>
            <p>{t.bandText}</p>
            <ul className="nx-band-points">
              {t.bandPoints.map((p, i) => (
                <li key={p}><b>{ar ? ['٠١', '٠٢', '٠٣'][i] : `0${i + 1}`}</b>{p}</li>
              ))}
            </ul>
          </div>

          <div className="nx-stat-figure">
            <strong>{t.statValue}</strong>
            <small>{t.statLabel} · {t.statUnit}</small>
            <i className="nx-stat-line" aria-hidden="true" />
            <em>{t.statNote}</em>
            <div className="nx-sag">
              <span className="nx-sag-bar" aria-hidden="true"><span /></span>
              <span>
                <b>{t.sizesTitle}</b> · 14.5 / 16 / 16.5 cm
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── advantages: numbered cards, cropped numerals ────────────────── */}
      <section className="nx-section" id="supply">
        <div className="nx-wrap">
          <div className="nx-sheet-head">
            <div>
              <span className="nx-eyebrow"><b>٠٥</b>{t.advKicker}</span>
              <h2 className="nx-h2">{t.advTitle}</h2>
            </div>
            <p className="nx-lead">{t.advText}</p>
          </div>

          <div className="nx-cards" style={{ marginTop: 'clamp(18px, 2.4vw, 28px)' }}>
            {t.adv.map(([title, body], i) => (
              <article className="nx-card" key={title}>
                <span className="nx-chip">{t.advKicker}</span>
                <span className="nx-tile-arrow" aria-hidden="true"><ArrowUpRight size={15} /></span>
                <h3>{title}</h3>
                <p>{body}</p>
                <span className="nx-card-ghost" aria-hidden="true">{ar ? ['٠١', '٠٢', '٠٣'][i] : `0${i + 1}`}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── partners: two-up split, one paper one ink ───────────────────── */}
      <section className="nx-section" id="partners" style={{ paddingTop: 0 }}>
        <div className="nx-wrap">
          <div className="nx-sheet-head">
            <div>
              <span className="nx-eyebrow"><b>٠٦</b>{t.partnersKicker}</span>
              <h2 className="nx-h2">{t.partnersTitle}</h2>
            </div>
            <p className="nx-lead">{t.partnersText}</p>
          </div>

          <div className="nx-split">
            <article className="nx-partner">
              <span className="nx-partner-icon" aria-hidden="true"><Sparkles size={17} /></span>
              <div>
                <h3>{t.supplierTitle}</h3>
                <p>{t.supplierBody}</p>
              </div>
              <a className="nx-link" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
                {t.supplierCta} <ArrowUpRight size={14} />
              </a>
            </article>

            <article className="nx-partner is-ink">
              <span className="nx-partner-icon" aria-hidden="true"><Package size={17} /></span>
              <div>
                <h3>{t.importTitle}</h3>
                <p>{t.importBody}</p>
              </div>
              <a className="nx-link" style={{ color: 'inherit', borderColor: 'currentColor' }} href={`mailto:${EMAIL}`}>
                {t.importCta} <ArrowUpRight size={14} />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* ── contact: floating light app-card on the dark field ──────────── */}
      <section className="nx-band" id="contact">
        <div className="nx-wrap nx-contact">
          <div>
            <span className="nx-eyebrow"><b>٠٧</b>{t.contactKicker}</span>
            <h2 className="nx-h2">{t.contactTitle}</h2>
            <p>{t.contactText}</p>

            <div className="nx-contact-links">
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> {t.waLabel} · 010 90000676 <ArrowUpRight size={13} />
              </a>
              <a href={`mailto:${EMAIL}`}>
                <Mail size={16} /> {t.mailLabel} · {EMAIL} <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <form className="nx-form-card" onSubmit={(e) => e.preventDefault()} aria-label={t.contactKicker}>
            <div className="nx-form-grid">
              {t.fields.slice(0, 2).map((f) => (
                <label className="nx-field" key={f}>
                  <span>{f}</span>
                  <input type="text" name={f} autoComplete="off" />
                </label>
              ))}
              <label className="nx-field">
                <span>{t.fields[2]}</span>
                <input type="email" name="email" autoComplete="off" placeholder="name@company.com" />
              </label>
              <label className="nx-field">
                <span>{t.fields[3]}</span>
                <select name="product" defaultValue="">
                  <option value="" disabled>{t.productHint}</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g[lang].title}</option>
                  ))}
                </select>
              </label>
              <label className="nx-field is-wide">
                <span>{t.notes}</span>
                <textarea name="notes" placeholder={t.notesHint} />
              </label>
            </div>

            <button
              className="nx-btn nx-btn-solid nx-btn-block"
              type="button"
              onClick={() => setFormReady((v) => !v)}
              aria-expanded={formReady}
            >
              {t.submit} <ArrowUpRight size={15} />
            </button>
            <p className="nx-note">{formReady ? `✓ ${t.formNote}` : t.formNote}</p>
          </form>
        </div>
      </section>

      {/* ── closing: full-bleed cinematic frame + pill field ────────────── */}
      <section className="nx-close" aria-labelledby="nx-close">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/nx-bento-quality.jpg" alt="" aria-hidden="true" width={1024} height={1536} />
        <div className="nx-close-inner">
          <h2 className="nx-h2" id="nx-close">{t.closeTitle}</h2>
          <p>{t.closeSub}</p>
          <div className="nx-pillfield">
            <input type="text" placeholder={t.closePlaceholder} aria-label={t.closePlaceholder} />
            <a className="nx-btn nx-btn-solid nx-btn-sm" href="/catalog">
              {t.closeCta} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
