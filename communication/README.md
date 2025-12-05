# Communication Tab - Dental Practice Management

## Overview
This section allows you to collect and manage important details for each patient interaction. It provides a comprehensive form to record all communication-related information.

## Features
- ✅ Complete form with all required fields
- ✅ Date field (defaults to today)
- ✅ Patient's Name (required)
- ✅ School Year
- ✅ Current Dentist
- ✅ Language selection dropdown
- ✅ Date Called and Date Emailed fields
- ✅ Referral Type dropdown (TU0, TU1, TU2, TU3)
- ✅ Notes field for additional information
- ✅ Created By field (required)
- ✅ View all communication records
- ✅ Search functionality to filter records
- ✅ Edit and delete records
- ✅ Data persists in browser localStorage
- ✅ Responsive design for mobile devices

## How to Run/Test

### Method 1: Direct File Opening (Simplest)
1. Navigate to the `communication` folder
2. Double-click on `index.html` file
3. It will open in your default web browser
4. The communication form should load and be fully functional

### Method 2: Using a Local Server (Recommended)
If you have Python installed:

**Windows (PowerShell):**
```powershell
cd communication
python -m http.server 8000
```

**Or if you have Node.js installed:**
```powershell
cd communication
npx http-server -p 8000
```

Then open your browser and go to:
```
http://localhost:8000
```

### Method 3: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` in the communication folder
3. Select "Open with Live Server"
4. The communication tab will open in your browser

## Testing the Communication Tab

### Test Creating a Record:
1. Fill in the form with the following:
   - **Date**: Already set to today (or select a date)
   - **Patient's Name** (required): e.g., "John Doe"
   - **School Year**: e.g., "2024-2025"
   - **Current Dentist**: e.g., "Dr. Smith"
   - **Language**: Select from dropdown (e.g., "English")
   - **Date Called**: Select a date (optional)
   - **Date Emailed**: Select a date (optional)
   - **Referral Type**: Select from dropdown (TU0, TU1, TU2, or TU3)
   - **Notes**: Add any additional notes
   - **Created By** (required): e.g., "Admin User"
2. Click "Save Communication"
3. A success message should appear
4. The record should appear in the records list on the right

### Test Viewing Records:
1. Click on any record card in the records list
2. A modal will open showing all details
3. Review all the information

### Test Editing Records:
1. Click on a record to view it
2. Click the "Edit" button in the modal
3. The form will be populated with the record data
4. Make changes to any field
5. Click "Save Communication"
6. The record should be updated

### Test Deleting Records:
1. Click on a record to view it
2. Click the "Delete" button in the modal
3. Confirm the deletion
4. The record should be removed from the list

### Test Search Functionality:
1. Type a patient name in the search box
2. The records list should filter to show matching records
3. Click the X button to clear the search
4. All records should be displayed again

### Test Form Validation:
1. Try submitting the form without filling required fields (Date, Patient's Name, Created By)
2. The browser should show validation errors
3. Fill in the required fields and submit again

### Test Persistence:
1. Create several records
2. Refresh the browser (F5)
3. All records should still be there (stored in localStorage)

## Form Fields

### Required Fields:
- **Date**: Date of the communication
- **Patient's Name**: Full name of the patient
- **Created By**: Name of the person creating the record

### Optional Fields:
- **School Year**: Academic year (e.g., 2024-2025)
- **Current Dentist**: Name of the patient's current dentist
- **Language**: Selected from dropdown (English, Spanish, French, etc.)
- **Date Called**: Date when patient was called
- **Date Emailed**: Date when patient was emailed
- **Referral Type**: Selected from dropdown (TU0, TU1, TU2, TU3)
- **Notes**: Additional notes about the communication

## File Structure
```
communication/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── communication.js    # JavaScript functionality
└── README.md           # This file
```

## Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Notes
- Records are stored in browser's localStorage
- Each browser has its own storage (records won't sync across browsers)
- To clear all records, open browser console and run: `localStorage.removeItem('communicationRecords')`
- The form automatically sets today's date as default
- Records are displayed with the most recent first

## Troubleshooting
- **Form not submitting?** Make sure all required fields are filled
- **Records not saving?** Check browser console for errors (F12)
- **Styling looks broken?** Ensure styles.css is in the same folder as index.html
- **Search not working?** Make sure communication.js is loaded correctly

