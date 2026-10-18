# Nile Bed | نايل بد

Bilingual Arabic/English public website reconstructed from the supplied patch. Arabic is the default. No Firebase, authentication, or external image service is needed.

## Local development

Use Node.js 22+.

```sh
npm ci
npm run dev
```

Checks: `npm run typecheck` and `npm run build`.

## Vercel

Import this repository with **Next.js** as the framework and repository root as the root directory. Build command: `npm run build`; install: `npm ci`; leave output directory at the framework default. No secrets are required.

Set `NEXT_PUBLIC_SITE_URL` to the full production origin (for example `https://your-domain.com`, without a trailing path), then redeploy. Without it, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` supplies the origin for canonical URLs, sitemap and robots. Local builds fall back to `http://localhost:3000`.

The website source is merged into `main`. If this GitHub repository is connected to Vercel, pushing to the configured production branch will trigger its deployment workflow. No Vercel credentials or deployment status are configured in this repository.

## Patch recovery and launch limitations

The repository originally contained only a patch, not its original Next.js/PMO base. The patch could not be applied verbatim: the public page and CSS were reconstructed, the missing app scaffolding was created, and the legacy Firebase provider was intentionally omitted. The patch's JPEG entry contained no image bytes; an original local SVG illustration replaces it. The supplied patch is retained unchanged for reference.

The form is deliberately disabled until approved sales routing is supplied. Public Facebook pages were readable in the connected browser; the site includes the public company email and WhatsApp contact details. No company product/factory photo was saved for use, so the SVG remains explicitly illustrative. See `docs/research-2026-10-18.md` and `docs/nile-bed-source-audit.md` for source findings, limits and verification checklist.
