# Calendar Section - Dental Practice Management

## Overview
This is a Google Calendar-inspired calendar application that allows users to book appointments and events with color coding for better organization.

## Features
- ✅ Month view calendar with Google Calendar-like layout
- ✅ Create, edit, and delete events/appointments
- ✅ Color assignment for events (6 preset colors + custom color picker)
- ✅ Event details: Title, Date, Time, Description
- ✅ Navigation: Previous/Next month, Today button
- ✅ Events persist in browser localStorage
- ✅ Responsive design for mobile devices
- ✅ Click any day to create an event
- ✅ Click events to edit them

## How to Run/Test

### Method 1: Direct File Opening (Simplest)
1. Navigate to the `calendar` folder
2. Double-click on `index.html` file
3. It will open in your default web browser
4. The calendar should load and be fully functional

### Method 2: Using a Local Server (Recommended)
If you have Python installed:

**Windows (PowerShell):**
```powershell
cd calendar
python -m http.server 8000
```

**Or if you have Node.js installed:**
```powershell
cd calendar
npx http-server -p 8000
```

Then open your browser and go to:
```
http://localhost:8000
```

### Method 3: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` in the calendar folder
3. Select "Open with Live Server"
4. The calendar will open in your browser

## Testing the Calendar

### Test Creating Events:
1. Click on any day in the calendar
2. Fill in the event form:
   - **Event Title** (required): e.g., "Dental Appointment"
   - **Date** (required): Already set to the clicked day
   - **Time** (optional): e.g., "14:30"
   - **Description** (optional): Add any notes
   - **Color**: Choose from presets or custom color
3. Click "Save Event"
4. The event should appear on the calendar day with the selected color

### Test Navigation:
- Click **←** (Previous Month) button to go to previous month
- Click **→** (Next Month) button to go to next month
- Click **Today** button to jump to current month/date

### Test Editing Events:
1. Click on any existing event in the calendar
2. The edit modal will open with event details
3. Modify any field
4. Click "Save Event" to update
5. Click "Delete" to remove the event

### Test Color Assignment:
1. Create multiple events on the same day
2. Assign different colors to each
3. Events should display with their assigned colors
4. Try both preset colors and custom color picker

### Test Persistence:
1. Create some events
2. Refresh the browser (F5)
3. Events should still be there (stored in localStorage)

## File Structure
```
calendar/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── calendar.js     # JavaScript functionality
└── README.md       # This file
```

## Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Notes
- Events are stored in browser's localStorage
- Each browser has its own storage (events won't sync across browsers)
- To clear all events, open browser console and run: `localStorage.clear()`

## Troubleshooting
- **Calendar not loading?** Make sure all files (index.html, styles.css, calendar.js) are in the same folder
- **Events not saving?** Check browser console for errors (F12)
- **Styling looks broken?** Ensure styles.css is in the same folder as index.html

