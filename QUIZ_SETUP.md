# Quiz Portal Setup Guide

## Overview
The Quiz Portal is a standalone page for managing online quizzes with Google Sheets API integration. It features a glassy dark theme with purple accents and is fully mobile-responsive.

## Files Created
- **quiz.html** - Main quiz portal page
- **quiz.css** - Styling with glassy theme and responsive design
- **quiz-app.js** - JavaScript logic, timers, and API integration
- **QUIZ_SETUP.md** - This setup guide

## Features
✅ Live session timer countdown  
✅ Question paper viewer (hidden until session starts)  
✅ MCQ viewer with radio button selection  
✅ Quiz timer with progress bar  
✅ Essay submission with Google Drive link  
✅ Rules & regulations (collapsible)  
✅ "Quiz not started" message when inactive  
✅ Mobile-first responsive design  
✅ Glassy blur dark theme with purple accents  
✅ Google Sheets API backend support  

## How to Access
Access the quiz portal directly via URL:
```
http://yourdomain.com/quiz.html
```

**NOT integrated into the main home page yet** - It's a standalone page.

## Google Sheets API Setup

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename it to "Quiz Portal"

### Step 2: Set Up Sheets
Create two sheets in your spreadsheet:

**Sheet 1: "quiz_data"** (for questions)
```
| Question | Option A | Option B | Option C | Option D | Correct Answer |
|----------|----------|----------|----------|----------|----------------|
| What is 2+2? | 3 | 4 | 5 | 6 | B |
| Capital of France? | London | Berlin | Paris | Madrid | C |
```

**Sheet 2: "submissions"** (for essay submissions)
```
| Timestamp | Student Name | Email | Roll Number | Essay Link | MCQ Answers |
|-----------|--------------|-------|------------|------------|------------|
| (auto-populated) | (auto-populated) | (auto-populated) | (auto-populated) | (auto-populated) | (auto-populated) |
```

### Step 3: Get API Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the "Google Sheets API"
4. Create an API key (Credentials → Create Credentials → API Key)
5. Copy your API key

### Step 4: Get Sheet ID
1. Open your spreadsheet
2. The Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Copy the SHEET_ID

### Step 5: Update quiz-app.js
In `quiz-app.js`, update these constants:
```javascript
const GOOGLE_SHEETS_API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY'; // Paste your API key
const GOOGLE_SHEETS_ID = 'YOUR_GOOGLE_SHEET_ID'; // Paste your Sheet ID
const QUIZ_SHEET_NAME = 'quiz_data'; // Sheet name with questions
const SUBMISSIONS_SHEET_NAME = 'submissions'; // Sheet name for submissions
```

## Customization

### Change Session Start Time
In `quiz-app.js`:
```javascript
const QUIZ_CONFIG = {
    sessionStartTime: new Date(new Date().getTime() + 30 * 60000), // Change to desired time
    quizDuration: 90, // Quiz duration in minutes
};
```

### Change Colors
In `quiz.css`, update the CSS variables:
```css
:root {
    --primary-purple: #7C3AED;
    --primary-purple-light: #A78BFA;
    --primary-purple-dark: #5B21B6;
    --success-green: #10B981;
    --error-red: #EF4444;
    --warning-yellow: #F59E0B;
}
```

### Edit Rules & Regulations
In `quiz.html`, find the rules section and update:
```html
<div class="rule-item">
    <span class="rule-number">1</span>
    <p>Your custom rule here...</p>
</div>
```

## Demo Mode
The quiz portal works in **demo mode** if Google Sheets API is not configured:
- Shows demo questions (What is 2+2?, etc.)
- Stores submissions in browser's localStorage
- Perfect for testing the UI/UX

To enable demo questions, simply don't configure the API credentials.

## Browser Storage
- **localStorage** stores quiz session state for persistence
- Session timers survive page refreshes
- Demo submissions are saved locally

## Features Breakdown

### 1. Session Timer
- Counts down to quiz start
- Updates every second
- Shows hours:minutes:seconds
- Warning when less than 5 minutes remain

### 2. Question Paper Viewer
- Hidden until session starts
- Displays "Quiz session not started" message
- Shows countdown hint
- Displays all MCQ questions once active

### 3. MCQ Viewer
- Radio button selection for each option
- Visual feedback on selection
- Organized with question cards
- Numbered questions

### 4. Quiz Timer
- Visible only during active quiz
- Animated progress bar
- Color change based on time remaining (green → yellow → red)
- Shows remaining time

### 5. Essay Submission
- Name, email, roll number fields
- Google Drive link validation
- Optional notes field
- Form validation
- Success/error messages

### 6. Rules & Regulations
- Collapsible section
- 6 built-in rules
- Easy to customize
- Animated transitions

### 7. Submission Status
- Shows after successful submission
- Displays all submitted information
- Confirmation with timestamp

## Mobile Responsiveness

The quiz portal is fully responsive with breakpoints at:
- **Desktop**: 1400px (2-column layout)
- **Tablet**: 768px (1-column layout)
- **Mobile**: 480px (optimized fonts and spacing)

All interactive elements are touch-friendly.

## Performance Tips
1. **CDN**: Host on a CDN for faster loading
2. **Compression**: Gzip CSS/JS files
3. **Lazy Loading**: Load questions only when session starts
4. **Session Persistence**: Uses localStorage to survive page refreshes

## Troubleshooting

### API Key Not Working
- Check API key is correct
- Ensure Sheets API is enabled in Google Cloud
- Check CORS settings if on different domain

### Questions Not Loading
- Check sheet name matches `quiz_data`
- Ensure sheet has proper headers
- Browser console will show errors

### Timer Not Syncing
- Check browser's localStorage is enabled
- Refresh page to restore state
- Check browser console for errors

### Submissions Not Saving
- In production, need backend server to write to Google Sheets
- Demo mode saves to localStorage
- Production requires Apps Script or server endpoint

## Production Deployment

For production, implement:
1. **Backend Server**: Node.js/Python to handle submissions
2. **Google Apps Script**: To append data to Google Sheets
3. **Authentication**: User login/verification
4. **CORS Proxy**: For secure API calls
5. **Rate Limiting**: Prevent spam submissions

## Support
For issues or questions, check:
- Browser console (F12) for errors
- Network tab for API call failures
- localStorage for saved data

---

**Quiz Portal v1.0** | Created for AkashaXplore 2026
