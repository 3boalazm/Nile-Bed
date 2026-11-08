'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, Filter, Phone, Mail, Globe2, Menu, X, Moon, Sun, Check, Package, Layers3, Boxes, Scissors, Link2, Sparkles, Wrench, ShieldCheck, Info, ClipboardList, Ruler, ShoppingBag } from 'lucide-react';
import { groups, items } from './data';
import { countByUnit, unitById, unitOf, units, type UnitId } from './units';
import { STORAGE_KEY, pickedIds, readDraft, togglePicked, writeDraft } from './draft';
import { Chrome, SiteFooter, useLang } from '../components/next/Chrome';
import './catalog.css';

type Lang = 'ar' | 'en';
type Theme = 'light' | 'dark';

const ui = {
  ar: {
    nav: ['الرئيسية', 'الكتالوج', 'مراجعة الطلب', 'تواصل'],
    title: 'كتالوج خامات نايل بد',
    subtitle: 'كل الأصناف في مكان واحد — سوست وفريم وسلك، شاسيهات مجمّعة، بوكيت رول ومفروش جاهز، ميموري ولاتكس وخام مراتب، لباد وفازلين وميلتون وبلاستيك، خيوط وتيب، لوازم تجميع، وغراء وعدد. الصور والرسوم توضيحية أُعدّت لتمثيل أنواع الخامات، وليست صورًا فعلية لمنتجات نايل بد أو لمخزونها. المواصفات النهائية تُؤكَّد مع الفريق.',
    disclaimer: 'الصور والرسوم توضيحية معدّة لتمثيل فئات الخامات، وليست صورًا فعلية من مصنع نايل بد أو لمخزونها الحالي. نورّد الخامات ونصنّع السوست فقط، ولا نصنّع مراتب جاهزة. محتاج قماش أو إسفنج؟ نوجّهك لشريك من شركائنا لتشتري بسعر مميز.',
    searchPlaceholder: 'ابحث في الأصناف… مثل: شاسية 18×25، بوكيت مفروش، سلك 2.4، لباد أسود، تيب 3D',
    all: 'الكل',
    count: (n: number) => `${n} صنف`,
    enquire: 'استفسر عبر واتساب',
    emailEnquire: 'راسلنا بالبريد',
    buildOrder: 'راجع الطلب',
    addToOrder: 'أضف للطلب',
    added: 'تمت الإضافة',
    removeFromOrder: 'إزالة من الطلب',
    reviewOrder: 'راجع الطلب',
    currentOrder: 'طلبك الحالي',
    itemsWord: 'صنف',
    floatHint: 'اختيار أولي — الكميات بتتحدد في الخطوة الجاية',
    initialNote: 'دا اختيار أولي بس: الزرار بيضيف الصنف لقائمة طلبك من غير ما يحدد كمية أو ينقلك لصفحة تانية. كمّل اختيار الأصناف اللي تعجبك، وبعدين اضغط «راجع الطلب» عشان تحدد الكميات في الخطوة الجاية.',
    step1: 'الاختيار الأولي من الكتالوج',
    step2: 'مراجعة الطلب وتحديد الكميات',
    filterByUnit: 'تصفية حسب وحدة القياس',
    allUnits: 'كل الوحدات',
    orderBy: 'يُطلب بـ',
    approx: 'تقديري',
    approxTitle: 'وحدة القياس مستنتجة من نفس فئة الصنف في الجرد، وتُؤكَّد مع الفريق قبل التوريد',
    unitsNote: 'التصنيف حسب وحدة القياس مأخوذ من جرد المخزون: رول، م³، صفيحة، توب، كرتونة، كجم/كيلو، عدد. هنا تختار الأصناف اختيارًا أوليًا فقط؛ تحديد الكميات بيتم في الخطوة الجاية «راجع الطلب».',
    specs: 'المواصفات',
    available: 'متوفر حسب الطلب',
    illustrative: 'صورة توضيحية',
    backTop: 'العودة للأعلى',
    toggle: 'English',
    contactNote: 'للطلب والاستفسار: واتساب 010 90000676 • info@nilebed.com',
    noResults: 'لا توجد نتائج مطابقة. جرّب كلمة أخرى أو اختر فئة مختلفة.',
    footer: 'خامات المراتب وتصنيع السوست · مصر',
    themeDark: 'الوضع الليلي',
    themeLight: 'الوضع النهاري',
  },
  en: {
    nav: ['Home', 'Catalog', 'Review order', 'Contact'],
    title: 'Nile Bed Catalog',
    subtitle: 'Every category in one place — springs, frames and wire, assembled shasia units, pocket rolls and ready-spread pocket, memory, latex and mattress cores, felt, non-woven, Melton and plastic, threads and tape, assembly fasteners, glue and tools. Product illustrations are for category reference only; they are not photos of Nile Bed or confirmed stock. Final specs are confirmed with the team.',
    disclaimer: 'Product illustrations show representative material types only; they are not photos of Nile Bed, actual products or current stock. We supply materials and make springs only; we do not make finished mattresses. Need fabric or sponge? We refer you to one of our partners so you can buy at a special price.',
    searchPlaceholder: 'Search items… e.g. shasia 18×25, ready pocket, wire 2.4, black felt, 3D tape',
    all: 'All',
    count: (n: number) => `${n} items`,
    enquire: 'Enquire on WhatsApp',
    emailEnquire: 'Email us',
    buildOrder: 'Review order',
    addToOrder: 'Add to order',
    added: 'Added',
    removeFromOrder: 'Remove from order',
    reviewOrder: 'Review order',
    currentOrder: 'Your current order',
    itemsWord: 'items',
    floatHint: 'Initial selection — quantities are set in the next step',
    initialNote: 'This is an initial selection only: the button adds the item to your order list without setting a quantity or navigating away. Pick everything you like, then press “Review order” to set quantities in the next step.',
    step1: 'Initial selection from the catalog',
    step2: 'Review order & set quantities',
    filterByUnit: 'Filter by unit of measure',
    allUnits: 'All units',
    orderBy: 'Sold by',
    approx: 'estimated',
    approxTitle: 'Unit inferred from the same product family on the stock sheet; confirm with the team before supply',
    unitsNote: 'Units come from the stock sheet: roll, m³, tin, bolt, carton, kg/kilo and piece. This page is for the initial selection only; quantities are set in the next step, “Review order”.',
    specs: 'Specs',
    available: 'Available on order',
    illustrative: 'Illustrative image',
    backTop: 'Back to top',
    toggle: 'العربية',
    contactNote: 'For orders: WhatsApp 010 90000676 • info@nilebed.com',
    noResults: 'No matches. Try another keyword or pick a different category.',
    footer: 'Mattress materials & spring manufacturing · Egypt',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
  },
} as const;

const groupMeta: Record<string, { icon: React.ReactNode }> = {
  springs: { icon: <Layers3 size={16} /> },
  shasia: { icon: <Boxes size={16} /> },
  pocket: { icon: <Package size={16} /> },
  foam: { icon: <Sparkles size={16} /> },
  materials: { icon: <ShieldCheck size={16} /> },
  supplies: { icon: <Scissors size={16} /> },
  fasteners: { icon: <Link2 size={16} /> },
  tools: { icon: <Wrench size={16} /> },
};

function BrandLogo({ variant }: { variant: 'light' | 'dark' | 'auto' }) {
  return (
    <span className={`brand-logo is-${variant}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-light" src="/logo-on-light.svg" alt="Nile Bed" width={454} height={270} decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo-alt" src="/logo-on-dark.svg" alt="" aria-hidden="true" width={454} height={270} decoding="async" />
    </span>
  );
}

export default function CatalogPage() {
  const [lang, setLang] = useLang();
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [activeUnit, setActiveUnit] = useState<UnitId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  // Preliminary selection only. A picked item has an EMPTY quantity until the
  // visitor sets it on /order — nothing here navigates or assigns a number.
  const [selection, setSelection] = useState<string[]>([]);
  const [lastAction, setLastAction] = useState('');
  const unitCounts = useMemo(() => countByUnit(items.map((it) => it.id)), []);

  const t = ui[lang];
  const ar = lang === 'ar';

  // Read the shared draft on mount and keep in sync if another tab changes it.
  useEffect(() => {
    setSelection(pickedIds(readDraft()));
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setSelection(pickedIds(readDraft()));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleSelection = (id: string) => {
    const draft = readDraft();
    const wasPicked = Object.prototype.hasOwnProperty.call(draft.order, id);
    const next = togglePicked(draft, id);
    writeDraft(next);
    setSelection(pickedIds(next));
    const name = ar ? items.find((it) => it.id === id)?.ar.name : items.find((it) => it.id === id)?.en.name;
    setLastAction(wasPicked
      ? (ar ? `اتشال من الطلب: ${name}` : `Removed from order: ${name}`)
      : (ar ? `اتضاف للطلب: ${name} — الكمية في الخطوة الجاية` : `Added to order: ${name} — quantity in the next step`));
  };

  // Sizes are written as 18×25 across the catalog, but people often type 18*25
  // (as on the stock sheets) or with Arabic-Indic digits; normalise both sides.
  const normalizeSearch = (value: string) => value
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/(\d)\s*[*xX×]\s*(\d)/g, '$1×$2')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const filtered = useMemo(() => {
    const q = normalizeSearch(query);
    return items.filter((it) => {
      const byGroup = activeGroup === 'all' || it.group === activeGroup;
      if (!byGroup) return false;
      if (activeUnit !== 'all' && unitOf(it.id).unit !== activeUnit) return false;
      if (!q) return true;
      const hay = normalizeSearch(`${it.ar.name} ${it.ar.desc} ${it.ar.specs.join(' ')} ${it.en.name} ${it.en.desc} ${it.en.specs.join(' ')}`);
      return hay.includes(q);
    });
  }, [activeGroup, activeUnit, query]);

  const groupedForDisplay = useMemo(() => {
    if (activeGroup !== 'all' || activeUnit !== 'all' || query) return [{ id: 'results', items: filtered }];
    // show grouped by group id in order of groups definition
    return groups.map((g) => ({ id: g.id, items: items.filter((it) => it.group === g.id) }));
  }, [activeGroup, activeUnit, query, filtered]);

  const countBy = (groupId: string) => items.filter((it) => it.group === groupId).length;

  const waNumber = '201090000676';
  const email = 'info@nilebed.com';

  const picked = new Set(selection);

  return (
    <>
    <main className="nile nx catalog-page has-floating-order" dir={ar ? 'rtl' : 'ltr'} lang={lang} id="top">
      <Chrome lang={lang} onLang={setLang} page="catalog" />

      {/* Hero — dark field, hairline stats, floating image plate (reference set) */}
      <section className="nx-page-head">
        <div className="nx-wrap">
          <span className="nx-eyebrow"><b>02</b>{ar ? 'الكتالوج الكامل · مصر' : 'FULL CATALOG · EGYPT'}</span>
          <h1 className="nx-h1" style={{ fontSize: 'clamp(34px, 5.2vw, 68px)', marginTop: 14 }}>{t.title}</h1>
          <p style={{ maxWidth: '68ch' }}>{t.subtitle}</p>

          <div className="nx-page-head-stats">
            <span><i />{items.length} {ar ? 'صنف' : 'items'}</span>
            <span><i />{groups.length} {ar ? 'مجموعات' : 'groups'}</span>
            <span><i />{ar ? 'هبوط ≤ 1.2 سم' : 'Sag ≤ 1.2 cm'}</span>
            <span><i />{ar ? 'تصنيع مصري' : 'Made in Egypt'}</span>
          </div>

          <div className="nx-hero-actions" style={{ justifyContent: 'flex-start', marginTop: 22 }}>
            <a className="nx-btn nx-btn-solid" href="/order">
              <ClipboardList size={15} />{t.buildOrder}
              {ar ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
            </a>
            <a className="nx-btn nx-hero-ghost" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer">
              <Phone size={15} />{t.enquire}
            </a>
            <a className="nx-btn nx-hero-ghost" href={`mailto:${email}`}>
              <Mail size={15} />{t.emailEnquire}
            </a>
          </div>

          <div className="nx-hero-plate nx-catalog-plate">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/nx-hero-springs.jpg" alt={ar ? 'صفوف سوست بونيل بإضاءة دافئة' : 'Rows of bonnell springs in warm light'} width={1536} height={1024} />
            <span className="nx-plate-tag is-tr">{ar ? 'تصنيع نايل بد' : 'Made by Nile Bed'}</span>
            <span className="nx-plate-tag is-bl"><i />{ar ? 'مواصفات تُؤكَّد لكل طلب' : 'Specs confirmed per order'}</span>
          </div>
        </div>
      </section>

      <section className="nx-catalog-intro">
        <div className="nx-wrap">
          <div className="nx-note nx-disclaimer"><Info size={13} />{t.disclaimer}</div>
          <div className="nb-steps" aria-label={ar ? 'خطوات الطلب' : 'Order steps'}>
            <span className="nb-step is-current"><b>1</b>{t.step1}</span>
            <span className="nb-step-arrow">{ar ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}</span>
            <span className="nb-step"><b>2</b>{t.step2}</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="catalog-filters">
        <div className="filters-inner">
          <div className="filters-top">
            <div className="search-wrap">
              <Search size={16} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.searchPlaceholder} aria-label={ar ? 'بحث' : 'Search'} />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="clear"><X size={14} /></button>}
            </div>
            <div className="count-badge"><Filter size={13} />{t.count(filtered.length)}</div>
          </div>
          <div className="chips" role="tablist" aria-label={ar ? 'تصفية حسب الفئة' : 'Filter by category'}>
            <button role="tab" aria-selected={activeGroup === 'all'} className={activeGroup === 'all' ? 'chip active' : 'chip'} onClick={() => setActiveGroup('all')}>
              {t.all} <span>{items.length}</span>
            </button>
            {groups.map((g) => {
              const count = items.filter((it) => it.group === g.id).length;
              const label = ar ? g.ar.title : g.en.title;
              return (
                <button key={g.id} role="tab" aria-selected={activeGroup === g.id} className={activeGroup === g.id ? 'chip active' : 'chip'} onClick={() => setActiveGroup(g.id)}>
                  <span className="chip-icon">{groupMeta[g.id]?.icon}</span>{label} <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="unit-chips" role="tablist" aria-label={t.filterByUnit}>
            <span className="unit-chips-label"><Ruler size={13} />{t.filterByUnit}</span>
            <button role="tab" aria-selected={activeUnit === 'all'} className={activeUnit === 'all' ? 'unit-chip active' : 'unit-chip'} onClick={() => setActiveUnit('all')}>
              {t.allUnits} <span>{items.length}</span>
            </button>
            {units.map((u) => (
              <button key={u.id} role="tab" aria-selected={activeUnit === u.id} className={activeUnit === u.id ? 'unit-chip active' : 'unit-chip'} onClick={() => setActiveUnit(u.id)}>
                {ar ? u.ar.label : u.en.label} <span>{unitCounts[u.id]}</span>
              </button>
            ))}
          </div>
          <div className="units-note"><Info size={13} />{t.unitsNote}</div>
          <div className="nb-initial-note"><Info size={14} /><span><strong>{ar ? 'اختيار أولي' : 'Initial selection'}:</strong> {t.initialNote}</span></div>
          <div className="contact-note"><Info size={13} />{t.contactNote}</div>
        </div>
      </section>

      {/* Catalog grid */}
      <section className="catalog-body">
        {filtered.length === 0 ? (
          <div className="no-results">
            <Search size={22} />
            <p>{t.noResults}</p>
            <button className="button button-copper" type="button" onClick={() => { setQuery(''); setActiveGroup('all'); setActiveUnit('all'); }}>{ar ? 'إعادة ضبط' : 'Reset filters'}</button>
          </div>
        ) : (
          groupedForDisplay.map((section) => {
            if (section.items.length === 0) return null;
            const groupDef = groups.find((g) => g.id === section.id);
            const isResults = section.id === 'results';
            return (
              <div id={isResults ? 'results' : section.id} key={section.id} className="group-block">
                {!isResults && groupDef && (
                  <div className="group-head">
                    <div>
                      <div className="section-label"><span>{groups.indexOf(groupDef) + 1 < 10 ? `0${groups.indexOf(groupDef) + 1}` : groups.indexOf(groupDef) + 1}</span>{ar ? groupDef.ar.kicker : groupDef.en.kicker}</div>
                      <h2>{ar ? groupDef.ar.title : groupDef.en.title}</h2>
                      <p>{ar ? groupDef.ar.desc : groupDef.en.desc}</p>
                    </div>
                    <div className="group-count">{ar ? `${section.items.length} صنف` : `${section.items.length} items`}</div>
                  </div>
                )}
                {isResults && (
                  <div className="group-head results-head">
                    <h2>{ar ? 'نتائج البحث' : 'Search results'}</h2>
                    <span>{t.count(filtered.length)}</span>
                  </div>
                )}
                <div className="catalog-grid">
                  {section.items.map((it) => {
                    const name = ar ? it.ar.name : it.en.name;
                    const desc = ar ? it.ar.desc : it.en.desc;
                    const specs = ar ? it.ar.specs : it.en.specs;
                    const badge = ar ? it.ar.badge : it.en.badge;
                    const unitInfo = unitOf(it.id);
                    const unitDef = unitById[unitInfo.unit];
                    const unitLabel = ar ? unitDef.ar.short : unitDef.en.short;
                    const waText = encodeURIComponent(ar ? `مرحبا نايل بد، أستفسر عن: ${it.ar.name} — ${it.ar.specs.join('، ')}` : `Hi Nile Bed, enquiry about: ${it.en.name} — ${it.en.specs.join(', ')}`);
                    return (
                      <article key={it.id} className={`catalog-card ${it.highlight ? 'highlight' : ''}`}>
                        <div className="catalog-card-photo">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={it.image} alt={`${name} — ${t.illustrative}`} loading="lazy" decoding="async" />
                          <span>{t.illustrative}</span>
                        </div>
                        <div className="card-body">
                          <div className="card-title-row"><h3>{name}</h3>{badge && <span className="product-badge">{badge}</span>}</div>
                          <div className="card-unit-row">
                            <span className="card-unit">{t.orderBy} <strong>{unitLabel}</strong></span>
                            {unitInfo.source === 'family' && <em className="card-unit-est" title={t.approxTitle}>{t.approx}</em>}
                            <button
                              type="button"
                              className={picked.has(it.id) ? 'card-add is-picked' : 'card-add'}
                              aria-pressed={picked.has(it.id)}
                              title={picked.has(it.id) ? t.removeFromOrder : t.addToOrder}
                              onClick={() => toggleSelection(it.id)}
                            >
                              {picked.has(it.id) ? <Check size={12} /> : <ClipboardList size={12} />}
                              {picked.has(it.id) ? t.added : t.addToOrder}
                            </button>
                          </div>
                          <p>{desc}</p>
                          <ul className="specs">
                            {specs.map((s) => (
                              <li key={s}><Check size={12} />{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="card-foot">
                          <span className="avail"><span />{t.available}</span>
                          <div className="card-actions">
                            <a className="btn-wa" href={`https://wa.me/${waNumber}?text=${waText}`} target="_blank" rel="noopener noreferrer"><Phone size={13} />{ar ? 'واتساب' : 'WhatsApp'}</a>
                            <a className="btn-mail" href={`mailto:${email}?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(desc + '\n' + specs.join('\n'))}`}><Mail size={13} />{ar ? 'بريد' : 'Email'}</a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Closing CTA — the same full-bleed cinematic frame as the home page */}
      <section className="nx-close" aria-labelledby="nx-cat-close">
        <img src="/images/nx-bento-quality.jpg" alt="" aria-hidden="true" width={1024} height={1536} />
        <div className="nx-close-inner">
          <h2 className="nx-h2" id="nx-cat-close">
            {ar ? 'أخبرنا بمقاسك وكميتك، ونؤكد المواصفات والسعر.' : 'Tell us your size and quantity. We’ll confirm specs and price.'}
          </h2>
          <p>
            {ar
              ? 'السوست نصنعها، والخامات نورّدها. لا نبيع مراتب جاهزة. ولو محتاج قماش أو إسفنج، نوجّهك إلى الشريك المناسب لتشتري بسعر مميز.'
              : 'We make springs, we supply materials. No finished mattresses. Need fabric or foam? We point you to a partner so you can buy at a special price.'}
          </p>
          <div className="nx-hero-actions">
            <a className="nx-btn nx-btn-solid" href="/order">
              <ClipboardList size={15} />{t.buildOrder} <ArrowUpRight size={15} />
            </a>
            <a className="nx-btn nx-hero-ghost" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer">
              {t.enquire}
            </a>
            <a className="nx-btn nx-hero-ghost" href={`mailto:${email}`}>{t.emailEnquire}</a>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </main>

    {/* Always-on-screen, fixed review control — deliberately NOT at the page end. */}
    <div className="nb-float" dir={ar ? 'rtl' : 'ltr'}>
      <div className="nb-float-inner">
        <div className="nb-float-count">
          <ShoppingBag size={19} />
          <div>
            <span className="nb-float-label">{t.currentOrder} <strong>{selection.length}</strong> {t.itemsWord}</span>
            <span className="nb-float-hint">{t.floatHint}</span>
          </div>
        </div>
        <a className="nb-float-cta" href="/order">
          <span>{t.reviewOrder}</span>
          {ar ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </a>
      </div>
      <span className="nb-sr-only" aria-live="polite">{lastAction}</span>
    </div>
    </>
  );
}
