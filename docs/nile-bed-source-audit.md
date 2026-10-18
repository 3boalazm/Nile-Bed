# Nile Bed — preliminary source & asset audit

**Audit date:** 18 October 2026  
**Status:** Patch audit preserved below; current-session checks confirmed the three Facebook URLs return HTTP 403 and the machinery supplier homepage is accessible. Mobile fetches, searches, and subpage observations below originate in the supplied patch and were not independently repeated. Partial desk research. No Facebook post or image has been authenticated or downloaded. This is not launch approval.

## 1. Sources checked

| Source | What happened | Evidence / decision |
|---|---|---|
| Facebook profile ID `100047775297291` | Direct fetch returned HTTP 403; mobile-domain fetch also returned HTTP 403. Exact-ID web search did not surface an attributable result. | No posts, photos, videos, bio, contact details, dates, or rights could be inspected. **Pending**. User identifies this as one of the accounts used for updates. |
| Facebook profile ID `100009326443352` | Direct fetch returned HTTP 403; mobile-domain fetch also returned HTTP 403. Search did not establish an attributable company result. | No account relationship or content could be independently checked. **Pending**. User identifies this as one of the accounts used for updates. |
| Facebook `tefa.elsid` | Direct fetch returned HTTP 403; mobile-domain fetch also returned HTTP 403. Search did not surface relevant, attributable posts. | No personal or business posts were inspected. Do not use personal content. **Pending**. User identifies this as one of the update accounts. |
| Veysel Kütüklü reference website | Homepage and select Turkish product pages were accessible. | Used only to study product-page architecture and manufacturing storytelling. It is a machinery supplier/reference, **not a Nile Bed source**. Do not copy its text, photos, technical specs, testimonials, logos, or claim those machines are Nile Bed assets. |

### Reference-site observations (UX only)

The accessible reference homepage organizes machines as a catalog with a product image, series/model name, concise value proposition, detail page and direct enquiry path. An accessible VKY machine page presents a product-specific overview, a technical-specification table, options, brochure downloads and quote/service links. A VTC product page includes an illustrated process sequence and machine-specific options/specifications. These are useful patterns for a later Nile Bed catalog; the equipment, capacities, specifications, process and claims belong to Veysel Kütüklü and must not be represented as Nile Bed facts.

A linked machine-page URL returned a 404 and the reference pages also rendered a reCAPTCHA domain warning. Information is therefore limited to the accessible page extracts, not a complete website audit.

## 2. Information provided directly by the user (not independently verified)

| Claim | Provenance | Status / use |
|---|---|---|
| The three Facebook accounts listed above are used by the business to post updates. | User message, 18 Oct 2026 | **User-reported; pending confirmation by company.** |
| Atef/Aatif Taha (عاطف طه) is the owner. | User message, 18 Oct 2026 | **User-reported; confirm preferred English spelling and public use.** The current prototype uses “Atef Taha”. |
| The business works across mattress raw materials and supplies, broadly/end-to-end. | User message, 18 Oct 2026 | **User-reported; scope, exact categories, and whether this means trading/supply or manufacture need clarification.** Do not say every category is manufactured by Nile Bed. |
| The business manufactures springs and has a spring-production line with machinery associated with the Veysel Kütüklü reference. | User message, 18 Oct 2026 | **User-reported; machine make/model, ownership, installation, photos, and usage rights need confirmation.** No reference-site image is used in the website. |

## 3. Asset inventory

| Asset | Location | Provenance / rights | Status |
|---|---|---|---|
| Original vector spring illustration created for layout | `public/nilebed-springs.svg` | Code-drawn, generic SVG illustration; not a Nile Bed product/factory photograph. | **Supporting / illustrative.** It is explicitly labeled as illustrative in the interface and must be replaced by approved company photography before launch. |
| Nile Bed logo | None received | No original logo file could be retrieved. | **Pending** |
| Product photographs | None retrieved | Facebook inaccessible; no files provided. | **Pending** |
| Factory, line and machinery photographs/video | None retrieved | Facebook inaccessible; no files provided. | **Pending** |
| Approved product specs, brochures, certificates, customer references | None received | No independent company source available. | **Pending** |

## 4. Current website content safeguards

- The catalog uses broad inquiry categories (mattress materials and supplies, spring manufacturing, commercial requirements); it does not name unconfirmed spring types or invent technical properties.
- The image is labeled illustrative; it does not purport to show Nile Bed’s factory or a verified product.
- The RFQ form is intentionally disabled and states that it does not send data. No verified sales address or secure submission integration was supplied.
- The manufacturing section is framed as a customer enquiry/review process, not a claimed sequence of verified Nile Bed factory stages.
- No Veysel Kütüklü machine specs, images, testimonials, customer logos, or claims have been carried into the Nile Bed site.

## 5. Remaining verification checklist

1. Ask the company/account owner to provide original logo (SVG/transparent PNG), approved brand colors, and permission to use the files.
2. Request original, uncompressed product, raw-material, factory/line, operator-at-work and packaging photos/videos, with source account/post URL and written commercial-use approval. Keep originals and retain a rights/source register.
3. Confirm which of the three Facebook accounts is official/business-owned and whether the personal profile should be excluded. Obtain direct post URLs or account export/downloads; do not scrape private or access-controlled content.
4. Confirm the correct English spelling of عاطف طه, preferred title, and permission to identify the owner publicly.
5. Get the exact materials/supplies categories offered, which are made vs. distributed/sourced, and the actual spring product families made by Nile Bed.
6. Verify factory location, operating history, export markets, production steps, machine make/model, available dimensions/materials, QC, capacity, MOQ, packaging and lead times. Collect evidence for every public specification/claim.
7. Get approved sales email, phone/WhatsApp, address, response routing, privacy notice, and the owner of RFQs. Configure backend validation, spam protection, delivery, failure handling and retention before enabling the form.
8. Replace the illustrative image with approved, rights-cleared Nile Bed originals; optimize web derivatives while preserving originals.

**Conclusion:** The Facebook assets could not be reached from this research environment (403 responses); no claim is made that they were exhaustively retrieved. The most valuable next step is for the company to share original files or public post links and confirm the facts above. +#+#+#+#+#+
