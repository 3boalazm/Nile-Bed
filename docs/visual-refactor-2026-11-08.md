# Visual refactor — 2026-11-08

Complete redesign of the public site from the eight supplied references. The
element-by-element dissection lives in
`docs/visual-refactor-reference-dissection-2026-11-08.md`; this file records what
changed in code and what was deliberately kept.

## New files

| path | contents |
| --- | --- |
| `styles/next.css` | the new design language: shell, glass chrome, hero, overlapping sheet, bento, caption strip, node map, ink band, numbered cards, editorial rows, partner split, contact card, closing frame, footer, plus the catalog and order skins |
| `app/components/next/Chrome.tsx` | one glass pill header, one footer, `useLang` / `useTheme` hooks, shared constants (`WA`, `EMAIL`) |
| `public/images/nx-hero-springs.jpg` | hero plate: rows of bonnell coils, ivory/sand, copper rim light (1536×1024) |
| `public/images/nx-bento-wire.jpg` | bento/spec still life: wire spool and loose coils on sand paper |
| `public/images/nx-bento-materials.jpg` | bento still life: felt roll, non-woven sheet, foam stack, copper bowl |
| `public/images/nx-bento-quality.jpg` | closing frame: single coil, warm beam, near-black surround (portrait) |

## Changed

* `styles/tokens.css` — appended an **additive** `--nx-*` role layer (paper, ink,
  hairlines, bands, accent, depth, geometry, rhythm, type, motion) for both
  palettes. No legacy role was renamed or removed.
* `styles/tokens.css` — the light `--nb-l-subtle` was darkened `#666e69 → #5d645f`
  so the smallest captions clear 4.5:1 on paper *and* on the sunken surface
  (4.65:1 → 5.38:1 on paper, 5.07:1 on sunken). The dark palette already passed
  (6.57:1). All 46 checked pairs still pass.
* `app/page.tsx` — rebuilt section by section: dark hero with centred headline and
  overlapping media plate → sheet riding on the band with a 3-up bento → caption
  and marks strip → catalog as editorial hairline rows → five-node supply map →
  ink band built around the 1.2 cm number → 01/02/03 advantage cards with cropped
  numerals → partner split → floating contact card on the dark field → full-bleed
  closing frame with a pill field → shared footer.
* `app/catalog/page.tsx` — same data and interaction model; new chrome, a hairline
  `nx-page-head` hero with count pills and a floating plate, the 2-step rail, and
  the cinematic closing frame. The old `catalog-hero`, `stat-card` grid and footer
  are gone; all filters/search/pick logic is unchanged.
* `app/order/page.tsx` — same review flow; new chrome and footer, hero and step
  rail re-skinned onto the new tokens, quantity control turned into a pill. The
  draft contract (`nilebed-order-v1`) and the API call are untouched.
* `app/layout.tsx` — imports `styles/next.css`.

## Preserved on purpose

* 68 items / 8 groups in `app/catalog/data.ts`; springs named by wire gauge,
  height and coil Ø — never by spreadsheet row.
* Every spring spec still ends «نسبة الهبوط: لا تتجاوز 1.2 سم», and the home band
  states the same figure as its single loud statistic.
* Two-step order: picks are written from `/catalog` with an empty quantity, and
  only `/order` accepts a quantity.
* No prices anywhere. WhatsApp / e-mail remain the only contact channels.
* Arabic-first with the English toggle; light/dark switch keeps the
  `nilebed-theme-v3` key so existing visitors keep their choice.

## Verification run

```
npx tsc --noEmit                  → clean
npm run build                     → 10/10 pages, /, /catalog, /order static
npm run check:contrast            → 46/46 pairs pass in both palettes
curl /  /catalog  /order          → 200, new classes present, AR copy rendered
grep «الصف الأول|الثاني|الثالث»   → 0 hits
grep «1.2 سم» in home HTML        → present in hero tag, band text and list
```

## Known limits

* No headless browser in this sandbox (Playwright/Puppeteer cannot run), so the
  visual review was done by reading the rendered HTML and by arithmetic checks on
  the layout (overlap, stacking, contrast), not by screenshot.
* The node-map connectors are drawn with an inline SVG; at very narrow widths the
  diagram intentionally collapses into a vertical rail instead of shrinking.
