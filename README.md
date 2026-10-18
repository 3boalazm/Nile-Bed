# Nile Bed | نايل بد

Bilingual Arabic/English public website for Nile Bed — a wholesaler of mattress materials and supplies that manufactures springs. Arabic is the default language and Arabic/English can be switched from the header. No Firebase, authentication, or external image service is needed.

## What is in the site

- **Arabic-first, RTL** page with a one-tap English switch (the whole page, including layout direction, flips).
- **Light and dark themes.** The theme follows the visitor's system preference on first visit, is remembered in `localStorage` (`nilebed-theme`), and is applied by a tiny inline script before first paint so there is no flash of the wrong mode.
- **Official brand artwork in both variants** (see below), used in the header, the footer, and the "established" stamp.
- Sections: hero, supply-partner intro, business scope (manufactures springs · trades materials · does **not** make finished mattresses), catalog, process, capabilities, about, materials gallery with source links, CTA, contact and a preview enquiry form, footer.
- Metadata for search and sharing: canonical URL, Open Graph/Twitter card with a 1200×630 image (`public/og.png`), Organization JSON-LD, `manifest.webmanifest`, favicon and Apple touch icon, `robots.txt` and `sitemap.xml`.

## Brand assets

| File | Use |
| --- | --- |
| `public/logo-on-light.svg` | Logo for **light** surfaces (dark wordmark — the supplied "gray" logo) |
| `public/logo-on-dark.svg` | Logo for **dark** surfaces (white wordmark — the supplied "white" logo) |
| `app/icon.svg`, `app/apple-icon.png` | Favicon / Apple touch icon (wave mark on the brand charcoal) |
| `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png` | PWA/Android icons |
| `public/og.png` | Social sharing card |
| `public/nilebed-springs.svg` | Generic spring illustration, labelled on the page as illustrative (not a Nile Bed factory photo) |

Both logo files stay mounted where the theme can change; CSS (`.brand-logo.is-light`, `.is-dark`, `.is-auto`) decides which one is visible, so there is no flash or layout shift when the theme or language changes. The header and footer sit on dark bands and always use the dark-surface logo.

Colours live in `styles/nilebed.css` as design tokens on `.nile` plus a `html[data-theme='dark']` override block, so a new section only needs to use `var(--token)` to support both themes.

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
5. No secrets, environment variables, or external services are required to build. The enquiry form is intentionally disabled and does not submit or store anything; contact happens by email (`info@nilebed.com`) or WhatsApp (`+20 10 90000676`).

Pushing to the production branch connected in Vercel triggers the deployment.

## Scope and source notes

The site presents Nile Bed as a wholesaler of mattress materials and supplies that manufactures springs. It does not present the company as a maker or seller of finished mattresses, and it says so explicitly in the hero note, the scope band, the catalog, the about section, the metadata and the Organization JSON-LD. See `docs/scope-audit-2026-10-18.md` and `docs/nile-bed-source-audit.md`.

Product availability, current stock, dimensions and technical specifications are always stated as "confirmed on enquiry". Public Facebook updates are linked as sources rather than quoted as a live catalogue. Replace the illustrative spring artwork with approved company photography when it is available.
