# Vehicle Pass Register

A phone app (Chrome on Android) to record vehicle passes by voice or by typing, and write each pass as a row in a Google Sheet.

Files:
- `index.html` — the app. Publish this on GitHub Pages.
- `Code.gs` — the Google Apps Script that writes into the Sheet.

## 1. Create the Google Sheet and the script (once)

1. Create a new Google Sheet, for example "Vehicle Pass Register".
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the sample code and paste the whole of `Code.gs`.
4. Change `ACCESS_CODE` to a code of your choice (for example `colony2026`). Keep it safe.
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, allow the permissions, and copy the **Web app URL** (it ends in `/exec`).

The first row is created automatically: ID, Saved at, Vehicle number, Owner name, Vehicle type, Owner type, Plot number, Pass issued date, Delivery challan date, Comments, Last updated.

## 2. Publish the app on GitHub Pages (once)

1. Create a GitHub repository, for example `vehicle-pass`, and upload `index.html` (and this README).
2. Go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. After about a minute the app is at `https://<your-user>.github.io/vehicle-pass/`.

The web address and code are not stored in the repository. Each phone enters them in Settings.

## 3. Set up each phone (once per phone)

1. Open the Pages link in **Chrome** and allow the microphone when asked.
2. Tap **Settings**:
   - Paste the **Web app URL** from step 1.6.
   - Type the **Access code** from step 1.4.
   - Choose the **Voice language**: English (India) or Tamil.
3. Tap **Save**.

## 4. Using it at the gate

- **Speak all details:** tap the big button and say, for example:
  "vehicle number TN 09 AB 1234, owner name Ravi Kumar, two wheeler, member, plot 45"
  Add "used vehicle", "challan date 12/11/2026" or "comments …" as needed.
- **One field at a time:** tap the 🎤 next to a field and say its value.
- Check the form, then tap **Save to register**. The row goes to the Sheet at once.
- If there is no internet, the entry is kept on the phone as *pending* and is sent when the phone is back online (or tap **Records → Send pending now**).
- **Edit:** tap **Records**, then **Edit** on a row, change what is needed, and tap **Update record**. The same row in the Sheet is updated.

Dates are read as day/month/year (for example 12/11/2026 is 12 November 2026).

## Notes

- Every phone keeps its own list of records. The Google Sheet is the single register that all phones write to.
- Clearing the browser data on a phone removes its pending records. Records already sent are safe in the Sheet.
- Anyone with the access code can add rows. Change the code in `Code.gs` and in Settings if it is shared outside the team.
- Deleting a pass is done in the Sheet itself (delete the row).
