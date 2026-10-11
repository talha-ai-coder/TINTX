# TINTX Four-Product Car-Browse Flow — Implementation Plan

## Scope and behavior

- Preserve the existing static multi-section TINTX site, brand logos, cart, standalone COD checkout and WhatsApp ordering. Do not deploy or change production directly; deliver through a reviewable pull request.
- Expand the current single shade listing into four customer-approved items: Full Window Coverage Sunshades (PKR 2,499), Half Window Coverage Sunshades (PKR 2,499), Front Window Shield (PKR 3,500), and Rear Window Shield (PKR 2,800).
- Reuse all 34 existing vehicle makes and 138 existing model/generation records. Render each existing year range and expose its individual years for selection. Keep records that have no year range visible and ask the shopper for their year.
- Brand selection opens model/year cards with a photograph of the chosen car when a suitable reusable image is available. Images must match the vehicle; unavailable or uncertain images must not be replaced by a misleading vehicle photo. Include required source/license attribution.
- Selecting a vehicle shows all four shade types, user-provided price, product detail, fitment status and actions to add to the website cart or prefill a WhatsApp COD order.
- Only the current Honda City fit guide listing may be described as currently listed; still ask the team to confirm the exact vehicle and shade coverage before dispatch. All other make/model/year combinations remain available to request but are clearly labelled “Fitment confirmation required”; do not state unverified compatibility.
- Website cart/checkout must preserve product names, price, quantity and selected car. WhatsApp order messages must include these details and the requested COD/fitment confirmation.

## Project structure

- `index.html`: static shell, nav, existing stylesheet and script includes.
- `app.js`: SPA-style home, shop, product, fit-guide, cart and COD routes; vehicle data and cart interactions.
- `styles.css`, `ui-enhancements.css`, `packages.css`: existing responsive design system and feature styles.
- `packages.js`: supplemental package rendering; prevent it from duplicating or contradicting the new four-item catalog.
- `checkout.html`, `checkout-page.js`, `checkout-page.css`: standalone COD checkout, item summary and order submission.
- `car-model-photos/` plus a JSON attribution map: optimized sourced exterior photos and their credit/license metadata.

## Design

- **Design movement:** premium automotive editorial storefront, borrowing the reference’s clear brand → model/year → options hierarchy without copying its assets or exact page design.
- **Core principles:** vehicle-first imagery; scannable year coverage; visible fitment honesty; quick cart/WhatsApp ordering.
- **Color philosophy:** retain TINTX’s deep navy/teal and cyan highlights to signal trust, cooling/privacy and automotive polish; use amber only for fitment-check cautions.
- **Layout paradigm:** horizontally scrollable brand strip, responsive model/year photo cards, then a focused product-option panel for the selected vehicle; avoid adding unrelated checkout friction.
- **Signature elements:** dark photo cards with year pills; cyan product-price/action accents; compact fitment-status labels.
- **Interaction philosophy:** brand click reveals models immediately, selecting a generation reveals selectable years, and selecting the year immediately reveals the four product options. Keep keyboard interaction and touch targets usable.
- **Animation:** short, restrained hover/selection transitions; preserve reduced-motion preferences.
- **Typography system:** retain the current site's existing font stack and size hierarchy.
- **Brand essence:** removable window coverage for drivers wanting comfort and privacy without permanent tint; practical, clear, confident.
- **Brand voice:** direct and candid about confirmed versus unconfirmed fitment; example: “Choose your exact car year.” “We’ll confirm fit before dispatch.”
- **Wordmark & logo:** keep the existing TINTX logo unchanged.
- **Signature brand color:** retain existing cyan/teal accent; no rebrand.

## Constraints

- No compatibility claims beyond evidence currently present in TINTX’s fit guide.
- Respect third-party photo licenses and show attribution; never use watermarked commercial stock photos.
- Keep existing cart data backward-compatible where feasible. Never submit live orders or deploy from this task.

## Implementation and verification status

- Implemented on the feature branch; production has not been deployed or modified.
- Reused all 34 makes and 138 existing model/generation records. Shoppers can select an exact year from each range, or enter an exact year where a range is unavailable.
- Added 134 locally optimized, attributed Commons vehicle-image records. A strict generation/body-style audit found usable photos for 126 of 138 model/generation records. The remaining 12 exact matches could not be sourced under a suitable reuse license; these records show a neutral fallback and are listed in `vehicle-photo-missing.txt` rather than displaying a misleading car.
- Added separate front/rear/full/half product options at the customer-confirmed PKR prices. Cart lines retain the product, quantity, price and chosen vehicle; checkout and WhatsApp messages include the selected item and car.
- Local Chromium QA passed the brand → model → year → shade path, a two-product COD cart/summary (PKR 6,300), individual line removal, exact Honda City wording, custom-car year validation, shop search/sort and 390 px mobile width. No order was submitted.
- Remaining release step: review and merge the pull request; only then will the site update through its normal deployment process.
