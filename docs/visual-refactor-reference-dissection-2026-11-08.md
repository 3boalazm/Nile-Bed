# Dissection → build: the Nile Bed visual refactor (2026-11-08)

Eight references were supplied. This document is the literal dissection of each
one (what is actually inside it, element by element) and the record of which
element landed where in the rebuilt site. Nothing here is "inspired by": each
row names a concrete, visible element and the file/component that carries it.

Files added by the refactor:

| file | role |
| --- | --- |
| `styles/next.css` | the new design language (shell, chrome, hero, sheet, bento, node map, band, cards, rows, split, form, footer, catalog + order skins) |
| `app/components/next/Chrome.tsx` | one glass pill header + one footer + `useLang` / `useTheme` for every page |
| `app/page.tsx` | home rebuilt section by section |
| `app/catalog/page.tsx` | same data/logic, new chrome, new hero, new closing frame |
| `app/order/page.tsx` | same review flow, new chrome, re-skinned hero/step rail |
| `styles/tokens.css` | additive `--nx-*` role layer for both palettes |

---

## 1. `image-3` — the light-blue crypto landing (BloomFi)

**Inside the image**

1. A page inset inside a pale-blue rounded frame — the whole site is a *card*.
2. Header: tiny wordmark, 5 hairline text links, one dark pill CTA.
3. Hero: full-width photo band, **centred** two-line headline, one-line muted sub,
   dark pill button.
4. A soft 3D object (coin) emerging from the photo.
5. Split heading row: big question on the left, paragraph on the right, small
   filled pill ("Explore now") under the paragraph.
6. Bento of three: **one wide light card** with title top / copy bottom / photo on
   the right; **two dark cards**, each title top and copy bottom.
7. Logo strip: tiny left caption ("Backed by the best companies…") + 6–7 grey
   logos in one row.
8. Use-case split: left column kicker + big "Use cases" + paragraph; right white
   card with title, copy, "→ Learn more" and a 3D render bleeding off the bottom.

**Where it went**

| element | build |
| --- | --- |
| inset page card | `.nx` shell + `.nx-sheet` panel riding over the dark band |
| hairline pill header | `Chrome` → `.nx-chrome` (glass pill, blur, one dark CTA) |
| centred hero over photo | `.nx-hero` + `.nx-hero-copy` (centred eyebrow → h1 → sub → two pills) + `.nx-hero-plate` |
| 3D object emerging | `.nx-plate-tag` chips overlapping the plate edges + `.nx-hero-mark` accent word in the headline |
| split heading row | `.nx-sheet-head` (1.1fr heading / .9fr paragraph, aligned to the baseline) |
| bento of three | `.nx-bento` → `.nx-tile.is-photo` (wide) + `.nx-tile.is-ink` + `.nx-tile.is-accent` |
| logo strip | replaced by the `.nx-rows` catalog list + `.nx-rows-foot` (a caption line under the rows) |
| use-case split | `.nx-split` → `.nx-partner` / `.nx-partner.is-ink` (title, copy, hairline "→" link) |

---

## 2. `image-4` — the lavender "Advantages" sheet (MYDNA)

**Inside the image**

1. Thin top rule with `/04` left, "Landing Page" centred, "Benefits" right.
2. Huge light-weight page title "Advantages" on a lavender gradient, with a small
   paragraph pinned to the right.
3. A big white card containing: a two-column heading row, then **three grey
   advantage cards**. Each card has: small outline pill top-left, diagonal ↗ arrow
   top-right, title, body, and a **huge `01`/`02`/`03` numeral cropped by the card's
   bottom edge**.
4. A slider: heading, prev/next circles, "MAKE AN APPOINTMENT" pill, dot progress.
5. A full-bleed rounded image with a giant wordmark overlapping it.
6. Webinar block: left statement with one highlighted word, right icon+label and a
   lavender pill "SEE ALL"; then three circular thumbnails with numbered badges
   and title+description.

**Where it went**

| element | build |
| --- | --- |
| 3-part hairline masthead | `.nx-eyebrow` with `b` index + rule `i` on every section (`٠١ … ٠٧`) |
| oversized light title + right paragraph | `.nx-h1` / `.nx-h2` with `.nx-sheet-head` placing the paragraph at the optical right/baseline |
| white card containing the set | `.nx-sheet` (raised, 34px radius, soft shadow) |
| outline pill top-left | `.nx-chip` inside `.nx-card` |
| ↗ arrow top-right | `.nx-tile-arrow` (circle, 45% opacity → 100% on hover) |
| cropped `01/02/03` numeral | `.nx-card-ghost` (absolute, `inset-block-end: -28px`, paper-sunken tone) |
| slider dots / prev-next | removed: no slider in this business; the step rail (`.nx-progress` on /order) carries the numeral + progress idea |
| full-bleed image with wordmark | `.nx-close` band (photo + scrim + centred serif line + pill field) |
| circular thumbnails + badges | `.nx-node` icon discs in the node map, and `.nx-row-index` numerals |

---

## 3. `image-5` — the lavender orbit field (Prospectory)

**Inside the image**

1. Lavender gradient field with blurred spheres floating in the background.
2. **Orbit diagram**: two pill "nodes" (icon + title + subtitle) joined by a
   glowing connector line; two more pills sitting on a dashed arc.
3. Enormous negative space around the diagram.
4. Bottom-left and bottom-right small uppercase letter-spaced captions, each with
   a short purple rule.

**Where it went**

| element | build |
| --- | --- |
| orbit diagram | `.nx-map` with an inline SVG of two solid connectors + four dashed arcs |
| pill nodes w/ icon + title + sub | `.nx-node` (`.nx-node-icon` disc, `strong` + `small`), 5 in total |
| glowing connector | `.nx-node.is-core` — 6px accent halo ring + accent CTA disc on the centre node |
| negative space | `.nx-map` min-height 360–540px with nodes at 20%/50%/16% — the middle stays empty |
| bottom captions + rule | `.nx-map-caption.is-bl` / `.is-br` with a 26×2px accent rule |

The five nodes are Nile Bed's actual chain: wire & raw stock → spring production →
**Nile Bed (coordination point)** → fabric partners → foam & latex.

---

## 4. `image-6` / `image-7` — the white assistant card on a blue aura

**Inside the image**

1. Big rounded white card floating on a soft blue-lavender aura (halo).
2. Header: ring logo, two-line brand, right "✦ GTM AI" pill.
3. Inner glass panel: letter-spaced mini kicker, serif display headline with **one
   word in purple**, 2×2 white pill suggestions with icons.
4. Bottom search bar: `+`, placeholder, purple circular mic button.

**Where it went**

| element | build |
| --- | --- |
| floating card on an aura | `.nx-sheet` on `.nx-band`, and the `.nx-map` radial accent washes |
| header lock-up + status pill | `Chrome`: logo, 4 links, tools, dark CTA pill |
| serif headline, one accent word | `.nx-hero` h1 — `titleA` + `.nx-hero-mark` (`titleB`) + `titleC` |
| 2×2 pill suggestions with icons | contact form: two-column `.nx-form-grid` of labelled fields inside the floating `.nx-form-card` |
| bottom bar + `+` + circular button | `.nx-pillfield` in `.nx-close`: field + filled accent button — the same bar, business copy |

---

## 5. `image-8` — the white editorial finance page (ParaBol)

**Inside the image**

1. Wordmark + 5 links + plain text "Get Started" (no pill).
2. Two-column hero: big serif-ish bold headline left, a small bold **"4.52% APY"**
   figure, right column copy + purple pill CTA + underlined "Learn more ↗".
3. A huge floating chrome object (spoon) over the whitespace.
4. Logo strip: small left caption + 4–5 logos.
5. `What is paraUSD?` eyebrow + big heading.
6. **Ecosystem orbit**: centre purple app icon with 5 small uppercase labels around
   it; two text columns below; small black pill "See how paraUSD works".
7. Grey band: left "Use cases" intro; right white "Developers" card with copy,
   "→ Learn more", and a dark code block.

**Where it went**

| element | build |
| --- | --- |
| small bold headline figure | the ink band's `.nx-stat-figure` — `1.2` set at 56–104px |
| one figure as the page's loudest number | same block: `1.2` / "maximum sag" / note / hairline |
| logo strip with side caption | `.nx-rows-foot` (caption + count) and `.nx-map-caption` |
| eyebrow + big heading + white space | every `.nx-section` header pattern |
| orbit with centre icon + caps labels | `.nx-map` (centre node + four satellite pills) |
| small black pill CTA | `.nx-btn-ink` |
| grey band with white card + code block | `.nx-band` hosting the contact `.nx-form-card`; `.nx-sag` dashed spec block plays the code block's part |

---

## 6. `image-9` — the dark glass "Intelligent Flow" hero

**Inside the image**

1. Dark grey field; a floating rounded glass hero card inset from the edges.
2. Inside the card: tiny logo + 4 nav links + search field + black pill CTA.
3. Centred light headline, two-line dim sub, **glowing cyan pill button**.
4. Bottom-left mini stat card (value + tiny bar chart); bottom-right dot pagination
   + circular arrow.
5. Macro fluid/metal imagery wrapping the card's edges.

**Where it went**

| element | build |
| --- | --- |
| floating glass card | `.nx-chrome` (glass, blur, hairline) over the dark hero |
| glowing pill button | `.nx-btn-solid` (coral) with the accent halo on `.nx-node.is-core`; the glow language is carried by `box-shadow` + halo rings |
| mini stat card in a corner | `.nx-plate-tag` chips at the plate's corners + `.nx-stat-figure` |
| macro imagery wrapping | `.nx-hero-plate` (21:8 photo, scrim, rounded 44px) |
| dot pagination / circular arrow | `.nx-row-go` circular arrow buttons, `.nx-tile-arrow`, and the `.nx-progress` step pills |

---

## 7. `image-10` — the split product hero (Spur.fit)

**Inside the image**

1. Split hero: text column on slate-teal, full-height photo on the right.
2. Nav: logo + 4 links + outline pill CTA.
3. Headline in 3 lines with an **inline icon-chip cluster** attached to the line end.
4. Sub-paragraph.
5. **Input + button combo field** ("email → Get Started") styled as one pill.
6. Bottom-left avatar row + "Trusted by 1000+ health coaches".
7. **Annotation callouts**: white dot + thin leader line + small label pointing at
   the photo.

**Where it went**

| element | build |
| --- | --- |
| split hero | `.nx-contact` (copy left / form card right) and `.nx-split` (partners) |
| outline pill CTA | `.nx-btn-line`, `.nx-hero-ghost` |
| inline icon-chip cluster | `.nx-page-head-stats` pills on /catalog; `.nx-hero-actions` pills on home |
| input + button in one pill | `.nx-pillfield` (field + filled button, single radius) |
| trust row under the fold | `.nx-band-points` — numbered hairline rows |
| annotation callouts on a photo | `.nx-plate-tag` chips anchored to the plate corners (the dot is the `i` inside the bottom-left tag) |

---

## 8. `image-11` — the cinematic serene band

**Inside the image**

1. Full-bleed cinematic illustration (misty forest, seated figure, bokeh).
2. Centred serif headline, two lines; one-line sub.
3. Pill search field with a teal "Join Waitlist" button.
4. Nav: text links split around a **centred circular logo mark**.
5. Deep teal/amber palette, heavy vignette.

**Where it went**

| element | build |
| --- | --- |
| full-bleed cinematic frame | `.nx-close` — `nx-bento-quality.jpg` at 50% under a radial scrim |
| centred serif headline | `.nx-close-inner h2` (display serif, max 22ch) + one-line sub |
| pill field with a coloured action | `.nx-pillfield` |
| centred logo mark in the chrome | the pill chrome keeps the logo left (a centred mark would fight the RTL nav); the *centred* element is the hero headline itself |
| heavy vignette | `.nx-close::after` radial gradient + `.nx-hero-plate::after` linear scrim |

---

## What stayed untouched on purpose

* `app/catalog/data.ts` — 68 items, 8 groups, springs named by wire/height/coil Ø,
  every spring spec ending «نسبة الهبوط: لا تتجاوز 1.2 سم».
* The two-step order model: `/catalog` writes empty-quantity lines into
  `nilebed-order-v1`; `/order` is the only place a quantity is entered.
* No prices anywhere; WhatsApp / e-mail are the only contact channels.
* AR-first with the EN toggle, and the light/dark switch (`nilebed-theme-v3`).
* `npm run check:contrast` — 46/46 pairs still pass in both palettes.
