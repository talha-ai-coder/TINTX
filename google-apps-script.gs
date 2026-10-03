const SHEET_NAME = 'Orders';
const TOKEN_PROPERTY = 'DASHBOARD_TOKEN';
const HEADERS = ['order_id','created_at','name','phone','city','address','car','product','quantity','total','payment','status'];

/**
 * Run setup() once from the Apps Script editor, then deploy as a Web app.
 * Set Script property DASHBOARD_TOKEN to a long random value before deployment.
 */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, HEADERS.length);
}

function doGet(e) {
  if (!isDashboardAuthorized_(e)) return json_({ ok: false, error: 'Unauthorized' });
  setup();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return json_([]);
  const headers = values.shift();
  const rows = values.map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] || '']))).reverse();
  return json_(rows);
}

function doPost(e) {
  setup();
  const data = parseBody_(e);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (data.action === 'status') {
    if (!isDashboardAuthorized_(e, data)) return json_({ ok: false, error: 'Unauthorized' });
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === String(data.order_id)) {
        sheet.getRange(i + 1, HEADERS.indexOf('status') + 1).setValue(clean_(data.status || 'New', 30));
        return json_({ ok: true, order_id: data.order_id });
      }
    }
    return json_({ ok: false, error: 'Order not found' });
  }

  const orderId = clean_(data.order_id || ('TINTX-' + new Date().getTime().toString().slice(-8)), 40);
  const duplicate = sheet.getDataRange().getValues().some((row, index) => index > 0 && String(row[0]) === orderId);
  if (duplicate) return json_({ ok: true, duplicate: true, order_id: orderId });

  const row = [
    orderId,
    clean_(data.created_at || new Date().toISOString(), 40),
    clean_(data.name, 120),
    clean_(data.phone, 40),
    clean_(data.city, 80),
    clean_(data.address, 500),
    clean_(data.car, 120),
    clean_(data.product || 'TINTX Removable Car Window Shades', 180),
    Math.max(1, Number(data.quantity || 1)),
    Math.max(0, Number(data.total || 2499)),
    clean_(data.payment || 'Cash on Delivery', 40),
    'New'
  ];
  sheet.appendRow(row);
  return json_({ ok: true, order_id: orderId });
}

function parseBody_(e) {
  try { return JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (_) { return {}; }
}

function isDashboardAuthorized_(e, data) {
  const expected = PropertiesService.getScriptProperties().getProperty(TOKEN_PROPERTY);
  if (!expected) return false;
  const params = (e && e.parameter) || {};
  const supplied = params.token || (data && data.token) || '';
  return supplied === expected;
}

function clean_(value, maxLength) {
  return String(value == null ? '' : value).trim().slice(0, maxLength);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
