# Nile Bed — selection-first order flow and design tokens (2026-11-02)

## Customer journey update
- Catalog cards add products to a preliminary selection only; no quantity input or implicit quantity is created.
- A persistent floating order action stays anchored to the viewport while browsing and shows the selected-product count.
- The review step contains only selected products. Quantities, notes, removal and unit-aware increments are edited here.
- Advancing to contact is blocked until every selected item has a valid quantity.
- Legacy drafts with positive quantities remain selected and retain their quantities; legacy /order?add=<id> links now add a preliminary selection without guessing a quantity.
- Submission still requires a complete quantity for every selected product and retains the existing API payload contract.

## Shared design tokens
styles/design-tokens.css defines semantic palette roles, typography, spacing, radii, shadows, focus and state colors at the document root. The light and dark palettes are switched by the existing html[data-theme] attribute and are bridged into the legacy .nile tokens so existing sections can adopt the shared values without changing component structure.

## Accessibility and contrast
- Focus rings use the theme-aware focus token.
- Status, danger and warning states have paired foreground/background tokens.
- Floating action uses high-contrast white-on-inverse and white-on-brand combinations.
- Computed palette checks: white text on the light primary (#c94326) is 4.87:1; white text on the dark primary (#b94729) is 5.26:1. Focus, body, muted and status pairs use theme-specific foreground/background tokens. A full automated scan of every legacy component is still required before production approval.

## Scope and safeguards
No catalog records, product identifiers, group identifiers, unit definitions, order API, webhook payload, WhatsApp destination, or email destination are changed.
