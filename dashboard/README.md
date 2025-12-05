# Dashboard - Dental Practice Management

## Overview
The Dashboard provides a comprehensive summary of all data in the software, giving users an overview of key metrics and information at a glance. It displays statistics, charts, and data tables for easy analysis.

## Features
- ✅ Summary cards showing Active Students and Active Schools
- ✅ Oral Health Status (%) Summary chart (bar chart)
- ✅ % of children receiving services chart (bar chart)
- ✅ CSDP's Statistics By School data table
- ✅ CSDP's Statistics By Facilities data table
- ✅ Interactive charts with Chart.js
- ✅ Responsive design for all screen sizes
- ✅ Clean, modern UI matching the design requirements

## How to Run/Test

### Method 1: Direct File Opening (Simplest)
1. Navigate to the `dashboard` folder
2. Double-click on `index.html` file
3. It will open in your default web browser
4. The dashboard should load with all charts and tables

### Method 2: Using a Local Server (Recommended)
If you have Python installed:

**Windows (PowerShell):**
```powershell
cd dashboard
python -m http.server 8000
```

**Or if you have Node.js installed:**
```powershell
cd dashboard
npx http-server -p 8000
```

Then open your browser and go to:
```
http://localhost:8000
```

**Note:** Make sure you have an internet connection as the dashboard uses Chart.js from a CDN.

### Method 3: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` in the dashboard folder
3. Select "Open with Live Server"
4. The dashboard will open in your browser

## Testing the Dashboard

### Test Summary Cards:
1. Check that "Active Students" shows: **11**
2. Check that "Active Schools" shows: **18**
3. Cards should have colored icons (purple and blue)

### Test Oral Health Status Chart:
1. Look for the chart titled "Oral Health Status (%) Summary"
2. Should show three categories:
   - History of Caries (Yes: ~8%, No: ~92%)
   - Sealant Present (Yes: ~50%, No: ~45%)
   - Untreated Caries (Yes: 0%, No: 100%)
3. Chart should have blue bars for "Yes" and green bars for "No"
4. Hover over bars to see tooltips with exact percentages
5. Legend should be visible at the top

### Test Services Chart:
1. Look for the chart titled "% of children receiving the following service"
2. Should show three categories:
   - Prophy (Yes: ~95%, No: ~5%)
   - Varnish (Yes: ~95%, No: ~5%)
   - Sealants (Yes: ~53%, No: ~47%)
3. Chart should have blue bars for "Yes" and green bars for "No"
4. Hover over bars to see tooltips
5. Legend should be visible at the top

### Test Schools Table:
1. Look for the table "CSDP's Statistics By School"
2. Should display at least 2 schools:
   - ANGELO ELEMENTARY SCHOOL
   - GILMORE ELEMENTARY SCHOOL
3. Table should have columns:
   - School Name
   - # Student Serve
   - # Receiving Sealant
   - # Receiving Flouride
   - # Receiving Prophy
   - # Students in 3rd Grade
4. Hover over rows to see highlight effect
5. Table should be scrollable if content is long

### Test Facilities Table:
1. Look for the table "CSDP's Statistics By Facilities"
2. Should show "No data available in table" (as per the design)
3. Table should have columns:
   - Facility Name
   - # People Serve
   - # Receiving Flouride
   - # Receiving Prophy

### Test Responsive Design:
1. Resize your browser window
2. Charts should adjust to fit the screen
3. Tables should become scrollable on smaller screens
4. Layout should stack vertically on mobile devices

### Test Visual Design:
1. Check that the header has a pink gradient background
2. Summary cards should have rounded corners and shadows
3. Charts should be in white cards with rounded corners
4. Tables should be in white cards with proper spacing
5. Overall design should match the provided image

## Chart Details

### Oral Health Status Chart:
- **Type:** Grouped Bar Chart
- **Colors:** Blue (#3b82f6) for "Yes", Green (#10b981) for "No"
- **Y-axis:** Percentage (0-100%)
- **Categories:** History of Caries, Sealant Present, Untreated Caries

### Services Chart:
- **Type:** Grouped Bar Chart
- **Colors:** Blue (#3b82f6) for "Yes", Green (#10b981) for "No"
- **Y-axis:** Percentage (0-100%)
- **Categories:** Prophy, Varnish, Sealants

## Data Structure

The dashboard currently uses sample data. In a production environment, this data would come from:
- Communication records (from Communication Tab)
- Calendar events (from Calendar Tab)
- Backend API endpoints
- Database queries

## File Structure
```
dashboard/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── dashboard.js    # JavaScript functionality and data
└── README.md       # This file
```

## Dependencies
- **Chart.js** (via CDN): Used for rendering interactive charts
  - Loaded from: `https://cdn.jsdelivr.net/npm/chart.js`

## Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Notes
- Charts are interactive - hover over bars to see exact values
- Tables are scrollable if content exceeds the container height
- Data is currently static (sample data) but can be easily connected to real data sources
- The dashboard uses the same header/navigation as other sections for consistency

## Troubleshooting
- **Charts not displaying?** Make sure you have an internet connection (Chart.js is loaded from CDN)
- **Tables not showing?** Check browser console for errors (F12)
- **Styling looks broken?** Ensure styles.css is in the same folder as index.html
- **Data not updating?** Currently uses sample data - modify `dashboard.js` to connect to real data sources

## Customization

To update the data, modify the `loadData()` method in `dashboard.js`. You can:
- Connect to localStorage data from other sections
- Fetch data from an API
- Use static data for demonstration
- Calculate statistics from existing records

