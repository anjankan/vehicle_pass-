// Vehicle Pass Register - Google Apps Script
// Receives records from the phone app and writes one row per pass into the sheet "Register".
// A record with the same ID is updated in place (used for Edit).

const ACCESS_CODE = 'change-this-code';   // must match "Access code" in the app's Settings
const SHEET_NAME = 'Register';
const HEADERS = ['ID', 'Saved at', 'Vehicle number', 'Owner name', 'Vehicle type', 'Owner type',
                 'Plot number', 'Pass issued date', 'Delivery challan date', 'Comments', 'Last updated'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.token !== ACCESS_CODE) return reply({ ok: false, error: 'wrong access code' });
    const r = body.record;
    if (!r || !r.id) return reply({ ok: false, error: 'no record' });

    const sheet = getSheet();
    const values = [r.id, r.createdAt, r.vehicle, r.ownerName, r.vehicleType, r.ownerType,
                    r.plot, r.passDate, r.challanDate, r.comments, new Date()];
    const ids = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
    let row = -1;
    for (let i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(r.id)) { row = i + 2; break; }
    }
    if (row > 0) {
      sheet.getRange(row, 1, 1, values.length).setValues([values]);
      return reply({ ok: true, action: 'updated' });
    }
    sheet.appendRow(values);
    return reply({ ok: true, action: 'added' });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function doGet() {
  return reply({ ok: true, app: 'vehicle pass register' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
