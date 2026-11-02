# Nile Bed — UX rebuild (November 2026)

## Product intent
Nile Bed is a bilingual B2B supplier site for mattress materials and spring manufacturing. The primary visitor is a workshop/factory owner or purchasing/production person, not a software user. The interface must let someone request materials without learning the supplier's stock taxonomy.

## UX audit — baseline findings
- The previous order builder made unit of measure the primary information architecture: seven unit buckets, followed by group filtering and search. This exposes internal stock classification before the customer has chosen what they need.
- The page asked users to understand the source sheet, inferred units and their caveats while they were still discovering products.
- The desktop summary/contact panel competed with product discovery; on smaller screens it forced a long, dense page.
- Product discovery, quantity entry, review and customer details appeared together, creating a high cognitive load and unclear completion sequence.
- Unit labels are operationally important, but should be contextual metadata on the chosen product, not the first navigation decision.
- The 23 family-inferred units must remain visibly marked as requiring confirmation; they must never be silently represented as owner-confirmed.
- Product illustrations/specifications, current stock, prices and availability must not be represented as confirmed when they are not.

## New information architecture
1. Home — what Nile Bed supplies/manufactures + direct entry points.
2. Catalog — browse the full range by material family.
3. Order — one guided task with three steps:
   - Choose materials: search by name/specification/size, browse by the eight product families, add quantities in context.
   - Review order: inspect selected items, edit quantities, add item-level notes, remove mistakes.
   - Contact details: collect only name and phone as required; company and general notes remain optional; send.
4. Contact — direct WhatsApp/email help at every stage.

## Primary journey
Home/Catalog → Order → Search or choose material family → Add item → Set quantity → Review basket → Add optional item notes → Enter name + mobile → Submit → Confirm actual receipt OR clearly offer WhatsApp/email fallback.

## Interaction rules
- Group products by CatalogGroup, not by unit.
- Keep selling unit adjacent to the selected product as supporting information.
- Quantity step size and integer/decimal behavior continue to come from unitById and unitOf.
- Accept Arabic-Indic and Persian digits and decimal separators.
- Keep product IDs, group IDs, all 69 product records and their metadata unchanged.
- Keep family-inferred units visibly labelled as requiring confirmation.
- Do not sum unlike units into a single misleading total.
- Persist the current draft in localStorage and restore the existing /order?add=<id> entry point.
- The customer can move backward without losing selected products or contact details.
- No prices, stock promises or invented availability are shown.
- Only show a success screen after POST /api/order confirms { ok: true, mode: "submitted" }.
- On fallback/network failure, preserve the draft and show WhatsApp/email/copy actions.

## Accessibility and responsive behavior
- Semantic headings, labelled inputs, buttons with accessible names, visible keyboard focus.
- Product specifications use native disclosure controls.
- Search, category chips, quantity controls and progress steps remain operable by keyboard.
- Mobile uses a fixed, thumb-reachable order summary action; the product list remains single-column.
- RTL/LTR is controlled at the page root and all controls preserve logical alignment.
- Color is not the only signal for selected products, validation errors or estimated units.

## Data and integration safeguards
- Do not edit app/catalog/data.ts, app/catalog/units.ts, app/api/order/route.ts, .env.example, the inventory CSVs or the Google Sheet workflow.
- Keep POST /api/order payload shape and webhook/fallback semantics unchanged.
- Keep nilebed-order-v1 storage key for existing customer drafts.
- Keep WhatsApp number and email destination unchanged.

## QA checklist (run before merge)
- [ ] npm ci
- [ ] npm run typecheck
- [ ] npm run build
- [ ] Browse all eight groups and verify all 69 items remain visible.
- [ ] Search Arabic/English names and dimensions using Arabic and Latin digits.
- [ ] Add, increment, decrement, edit and remove items.
- [ ] Verify integer-only units round to whole values; kg/m³ accept decimals.
- [ ] Verify 23 inferred units show the confirmation note.
- [ ] Reload and verify draft and contact details restore.
- [ ] Verify /order?add=<valid-id> adds one unit without losing existing draft.
- [ ] Review/back navigation preserves all values.
- [ ] Submit with missing name/phone and verify inline errors.
- [ ] Test webhook success, unconfigured fallback, upstream failure and offline behavior.
- [ ] Confirm a success screen is never shown for fallback/error responses.
- [ ] Test Arabic RTL and English LTR on 320px, 360px, 390px, tablet and desktop.
- [ ] Keyboard-only pass; visible focus; labels; no clipped horizontal overflow.

## Release note
This branch changes the order experience and its styling only. The catalog data, product IDs, unit definitions, order API and business integrations remain untouched.
