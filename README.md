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

The implementation is on `arena/a869aee2-nile-bed`. Choose that branch for a Vercel preview, or configure it as the production branch if desired. No Vercel deployment is performed by this repository alone.

## Patch recovery and launch limitations

The repository originally contained only a patch, not its original Next.js/PMO base. The patch could not be applied verbatim: the public page and CSS were reconstructed, the missing app scaffolding was created, and the legacy Firebase provider was intentionally omitted. The patch's JPEG entry contained no image bytes; an original local SVG illustration replaces it. The supplied patch is retained unchanged for reference.

The form is deliberately disabled until approved sales routing is supplied. Facebook links are available, but the research requests returned HTTP 403; no company photos were recovered. Do not present the SVG as factory photography. See `docs/research-2026-10-18.md` for source findings and image-reference URLs, and `docs/nile-bed-source-audit.md` for the inherited patch audit and verification checklist.
