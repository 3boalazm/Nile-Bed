# Nile Bed | نايل بد

Bilingual Arabic/English public website for Nile Bed — a wholesaler of mattress materials and supplies that manufactures springs. Arabic is the default language and Arabic/English can be switched from the header. No Firebase, authentication, or external image service is needed.

## What is in the site

- **Arabic-first, RTL** page with a one-tap English switch (the whole page, including layout direction, flips).
- **Light and dark themes.** The theme follows the visitor's system preference on first visit, can be toggled at any time, is remembered in `localStorage` (`nilebed-theme-v3`), and is applied before first paint to avoid a flash of the wrong mode.
- **Official brand artwork in both variants** (see below), used in the header, the footer, and the "established" stamp.
- Sections: product-led hero, business scope (manufactures springs · supplies materials · does **not** make finished mattresses), featured catalog, supply process, partner network, quality, contact and a preview enquiry form, footer.
- **Catalog:** 69 items in 8 groups — springs/frames/wire, assembled shasia units, pocket rolls and ready-spread pocket, memory/latex/mattress cores, felt & fabrics, threads & tapes, assembly fasteners, and glue & tools. See `docs/inventory-2026-10-19.md`.
- **Ordering from the catalog:** every card has **أضف للطلب / Add to order**. The chosen items, exact quantities and units collect in a sticky order bar (saved in the browser), and **إتمام الطلب** opens a short form for customer name, factory name, factory time, contact number and expected pickup date. Submitting opens WhatsApp with a ready message containing all of it — nothing is stored on the site or sent anywhere else. See `docs/ordering-flow-2026-10-21.md`.
- Metadata for search and sharing: canonical URL, Open Graph/Twitter card with a 1200×630 image (`public/og.png`), Organization JSON-LD, `manifest.webmanifest`, favicon and Apple touch icon, `robots.txt` and `sitemap.xml`.

## Brand assets

| File | Use |
| --- | --- |
| `public/logo-on-light.svg` | Logo for **light** surfaces (dark wordmark — the supplied "gray" logo) |
| `public/logo-on-dark.svg` | Logo for **dark** surfaces (white wordmark — the supplied "white" logo) |
| `app/icon.svg`, `app/apple-icon.png` | Favicon / Apple touch icon (wave mark on the brand charcoal) |
| `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png` | PWA/Android icons |
| `public/og.png` | Social sharing card |

Both logo files stay mounted where the theme can change; CSS (`.brand-logo.is-light`, `.is-dark`, `.is-auto`) decides which one is visible, so there is no flash or layout shift when the theme or language changes. The header and footer sit on dark bands and always use the dark-surface logo.

Base theme colours live in `styles/nilebed.css`; the shared editorial refinement tokens and responsive home/catalog treatments live in `styles/audit-refinement.css` and support both light and dark modes.

Typography: Arabic headings (H1–H6) use the self-hosted **KO Sans** family in `public/Fonts` — all seven supplied weights (100–700) are registered in `styles/ko-sans-headings.css` and applied to every heading level on both the home and catalog pages. English/LTR headings keep Fraunces + Cormorant Garamond, Arabic body copy uses Cairo, and UI text uses Manrope/DM Sans.

## Local development

Use Node.js 22.

```sh
npm ci
npm run dev
```

Checks: `npm run typecheck` and `npm run build`.

## Deploying on Vercel

1. Import **this repository** and keep the **Root Directory at the repository root** (not `public/` — `public/` only holds static assets).
2. Framework preset: **Next.js**. `vercel.json` already pins `framework`, `installCommand` (`npm ci`) and `buildCommand` (`npm run build`). Leave the output directory at the framework default.
3. Node.js version: 22.x (declared in `package.json` → `engines`).
4. Optional: set `NEXT_PUBLIC_SITE_URL` to the full production origin (for example `https://www.nilebed.com`, no trailing slash) so canonical URLs, `sitemap.xml`, `robots.txt` and JSON-LD use the final domain. Without it, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used; local builds fall back to `http://localhost:3000`.
5. No secrets, environment variables, or external services are required to build. The catalog order flow hands the finished order to the customer's own WhatsApp (number in `app/catalog/page.tsx` and `app/catalog/OrderDialog.tsx` wiring); the site does not receive, store or forward orders itself. The home-page enquiry form remains a preview. Contact happens by email (`info@nilebed.com`) or WhatsApp (`+20 10 90000676`).

Pushing to the production branch connected in Vercel triggers the deployment.

## Scope and source notes

The site presents Nile Bed as a wholesaler of mattress materials and supplies that manufactures springs. It does not present the company as a maker or seller of finished mattresses, and it says so explicitly in the hero note, the scope band, the catalog, the about section, the metadata and the Organization JSON-LD. See `docs/scope-audit-2026-10-18.md` and `docs/nile-bed-source-audit.md`.

Product availability, current stock, dimensions and technical specifications are always stated as "confirmed on enquiry". Public Facebook updates are linked as sources rather than quoted as a live catalogue. Replace the illustrative spring artwork with approved company photography when it is available.

The current 69-item catalog across 8 groups is recorded in `docs/inventory-2026-10-19.md`, which maps every line of the company's stock sheet (including the 11 shasia sizes and the five ready-spread pocket sizes) to a catalog card and lists the shorthand specs that still need final confirmation. The springs/frame/1.3 mm-wire story and the fabric-and-foam partner referral are recorded in `docs/product-confirmation-2026-10-19.md`. Prices and the figures written on the sheet are deliberately not published — everything is confirmed on enquiry.
