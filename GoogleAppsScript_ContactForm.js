// ══════════════════════════════════════════════════════════════
//  Zip Innovate Technology — Google Apps Script
//  Paste this into your Google Sheet's Apps Script editor
// ══════════════════════════════════════════════════════════════
//
//  HOW TO SET UP:
//
//  1. Go to https://sheets.google.com → Create a new spreadsheet
//     → Name it: "Zip Innovate - Contact Submissions"
//
//  2. In cell A1 through I1, add these headers:
//     Timestamp | First Name | Last Name | Email | Phone | Company | Service | Budget | Message
//
//  3. In the sheet, click: Extensions → Apps Script
//
//  4. Delete all existing code and paste THIS entire file
//
//  5. Click the 💾 Save button (or Ctrl+S)
//
//  6. Click: Deploy → New deployment
//     - Click the ⚙️ gear icon → Select "Web app"
//     - Description: "Contact Form Handler"
//     - Execute as: "Me (your email)"
//     - Who has access: "Anyone"
//     - Click "Deploy"
//
//  7. Authorize the app when prompted (click through the warnings)
//
//  8. Copy the Web App URL that appears
//
//  9. In your zip-innovate.html file, find this line:
//       const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
//     Replace the placeholder with your actual URL
//
//  DONE! Every form submission will now appear as a new row
//  in your private Google Sheet. Only you can see it.
//
// ══════════════════════════════════════════════════════════════

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),            // Timestamp
    data.firstName,        // First Name
    data.lastName,         // Last Name
    data.email,            // Email
    data.phone || '',      // Phone
    data.company || '',    // Company
    data.service,          // Service Interested In
    data.budget || '',     // Estimated Budget
    data.message           // Project Details / Message
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Test function to verify the script works
function testDoPost() {
  var testEvent = {
    postData: {
      contents: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "+1 555-0000",
        company: "Test Corp",
        service: "Blockchain Infrastructure",
        budget: "$10,000 - $50,000",
        message: "This is a test submission."
      })
    }
  };

  doPost(testEvent);
  Logger.log("Test row added successfully!");
}
