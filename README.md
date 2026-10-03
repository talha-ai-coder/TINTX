# TINTX

TINTX is a static COD e-commerce site for removable car window shades.

## Orders dashboard setup

The website emails new orders and can also save every order to a private Google Sheet for the dashboard.

1. Create a Google Sheet (for example, `TINTX Orders`).
2. Open **Extensions → Apps Script**, paste the contents of `google-apps-script.gs`, and save.
3. In Apps Script, open **Project Settings → Script properties** and add:
   - Property: `DASHBOARD_TOKEN`
   - Value: a long random secret that only you know
4. Run `setup()` once and approve the Google permissions.
5. Deploy **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the deployment `/exec` URL into `site-config.js`:

```js
window.TINTX_CONFIG = Object.freeze({
  orderApiUrl: 'https://script.google.com/macros/s/PASTE_DEPLOYMENT_ID/exec'
});
```

7. Push/redeploy the website. Open `/admin.html`; enter the same `DASHBOARD_TOKEN` when asked.

The dashboard token is kept in the browser session only. The public checkout can submit new orders, while dashboard reads and status changes require the token. Email remains enabled as a fallback, so an order is not silently lost if the sheet API is temporarily unavailable.

## Local check

```bash
python3 -m http.server 8000
```
