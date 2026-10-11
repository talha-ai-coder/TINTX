# TINTX car-first shade catalog — TODO

- [x] Show the four customer-priced products: Full Window Coverage Sunshades (PKR 2,499); Half Window Coverage Sunshades (PKR 2,499); Front Window Shield (PKR 3,500); Rear Window Shield (PKR 2,800).
- [x] Reuse all 34 existing makes and 138 model/generation records; expose each individual year inside a listed range and require a manual year for records without one.
- [x] Show matching, reusable vehicle photos when an exact model/generation image can be safely sourced; display visible image attribution and do not substitute known wrong body styles. **126 of 138** model/generation records have an image; 12 without a safe exact match are documented in `vehicle-photo-missing.txt` and show a neutral fallback.
- [x] On the selected model/year, show all four shade options, price, fitment status, Add to website cart, and a prefilled WhatsApp COD link.
- [x] Describe Honda City only as a currently listed fitment requiring exact-year confirmation; mark other selections as requiring fitment confirmation before dispatch.
- [x] Preserve product name, price, quantity and selected car through cart and COD checkout; allow individual cart-line removal and keep older saved cart lines readable.
- [x] Suppress duplicate or inconsistent legacy package/product displays so the four-item catalog is the single storefront source of truth.

## Verification

- JavaScript syntax checks passed for the updated site scripts.
- Local Chromium checks passed for model photo selection, exact-year selection, four product options/prices, WhatsApp message details, two-line cart total (PKR 6,300), COD checkout summary, independent cart-line removal, Honda City fitment wording, custom-car/manual-year validation, shop filtering/sorting, and mobile width at 390 px.
- No checkout form was submitted. Production was not changed; the feature is prepared for review on the feature branch.
