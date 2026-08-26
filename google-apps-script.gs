const SHEET_NAME = 'Orders';

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['order_id','created_at','name','phone','city','address','car','product','quantity','total','payment','status']);
    sheet.setFrozenRows(1);
  }
}

function doGet() {
  setup();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
  const headers = values.shift();
  const rows = values.map(r => Object.fromEntries(headers.map((h,i)=>[h,r[i]]))).reverse();
  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  setup();
  let data = {};
  try { data = JSON.parse(e.postData.contents || '{}'); } catch (_) {}
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (data.action === 'status') {
    const rows = sheet.getDataRange().getValues();
    const orderCol = 1;
    const statusCol = 12;
    for (let i=1; i<rows.length; i++) {
      if (String(rows[i][orderCol-1]) === String(data.order_id)) {
        sheet.getRange(i+1,statusCol).setValue(data.status || 'New');
        break;
      }
    }
    return json({ok:true});
  }

  const row = [
    data.order_id || '', data.created_at || new Date().toISOString(), data.name || '', data.phone || '',
    data.city || '', data.address || '', data.car || '', data.product || 'TINTX Removable Car Window Shades',
    data.quantity || 1, data.total || 2499, data.payment || 'Cash on Delivery', data.status || 'New'
  ];
  sheet.appendRow(row);
  return json({ok:true, order_id:data.order_id || ''});
}

function json(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
