# Catalog ordering flow — 2026-10-21

The catalog is no longer enquiry-only: a customer can build an order from the 69
catalog items and send it to Nile Bed on WhatsApp with their own details.

## What the customer does

1. On **/catalog**, each card has **أضف للطلب / Add to order**. Adding an item
   turns the button into a quantity stepper (`−  qty unit  +`) with a remove
   button, so the quantity can be set exactly on the card.
2. A sticky bar appears at the bottom with the number of items and total units,
   **مسح الطلب** (two taps to confirm) and **إتمام الطلب**.
3. **إتمام الطلب** opens the order dialog:
   - every line with an editable quantity and a unit selector
     (قطعة / شاسية / رول / متر / كجم / بكرة / كرتونة);
   - **اسم العميل** — required;
   - **اسم المصنع** — required;
   - **وقت المصنع** — required, free text for working hours / the best time to
     call or receive;
   - **رقم التواصل** — required, 8–15 digits, WhatsApp-friendly;
   - **ميعاد الاستلام المتوقع** — required date, today or later;
   - **ملاحظات إضافية** — optional.
4. **إرسال الطلب على واتساب** validates the form, then opens WhatsApp
   (`wa.me`) with a pre-filled message. The order is only actually sent when the
   customer presses send inside WhatsApp; the dialog then shows a confirmation
   with a link to reopen WhatsApp and a link to clear the order.

## WhatsApp message

The message always contains, in this order:

- a heading and the catalog URL;
- customer name, factory name, factory time, contact number and the expected
  pickup date (weekday, long date and ISO date);
- each item with up to two of its published specs, the exact quantity and unit;
- optional notes;
- a request to confirm availability, price and the pickup schedule.

Arabic is used when the page is in Arabic, English when the page is switched to
English. Item names and specs are taken from `app/catalog/data.ts`, so the
message can never drift from the published catalog.

## Behaviour and data

- The order and the customer's last-used details are saved in `localStorage`
  (`nilebed-order-v1`, `nilebed-order-details-v1`) so a reload or a phone call
  does not lose them. Nothing is sent to or stored on a server.
- The order bar is keyboard reachable, additions are announced in a polite live
  region, the dialog is a labelled `aria-modal` dialog, Escape closes it, focus
  returns to the trigger, and invalid fields get inline messages plus
  `aria-invalid`.
- Default units come from the item name (shasia / roll / cone / kg / metre /
  piece) and remain editable; the stock sheet does not publish pack sizes, so
  the unit is a request, not a confirmed pack.
- WhatsApp number: `201090000676` (from the existing site links). It is passed
  to `OrderDialog` as `waNumber` in `app/catalog/page.tsx`.

## Files

| File | Role |
| --- | --- |
| `app/catalog/page.tsx` | Cart state, persistence, add/stepper controls, sticky bar, dialog wiring |
| `app/catalog/OrderDialog.tsx` | Order lines editor, customer form, validation, WhatsApp handoff |
| `app/catalog/order.ts` | Types, units, default units, date formatting, message builder |
| `app/catalog/catalog.css` | Order controls, bar, dialog and responsive styles |

Prices are still not published anywhere; the message asks the team to confirm
availability, price and pickup.
