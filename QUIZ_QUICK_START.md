# 🎓 Quiz Portal - Quick Start Guide

## ✅ Files Created
```
quiz.html          → Main quiz portal page
quiz.css           → Glassy dark theme styling
quiz-app.js        → JavaScript logic & API integration
QUIZ_SETUP.md      → Full setup documentation
```

## 🚀 Quick Access
**Direct URL**: `quiz.html`

Open in browser: `file:///path/to/quiz.html`

## 🎨 Features Ready to Use
✅ **Session Timer** - Countdown to quiz start  
✅ **Question Paper** - MCQ viewer (hidden until session starts)  
✅ **Quiz Timer** - Active during quiz with progress bar  
✅ **Essay Submission** - Google Drive link upload form  
✅ **Rules & Regulations** - Collapsible section  
✅ **Mobile Responsive** - Works on all devices  
✅ **Dark Theme** - Glassy blur with purple accents  

## ⚙️ Configuration (Optional - Demo Mode Works!)

### To Use Real Google Sheets:
1. Open `quiz-app.js`
2. Find these lines (around line 7-10):
```javascript
const GOOGLE_SHEETS_API_KEY = 'YOUR_GOOGLE_SHEETS_API_KEY';
const GOOGLE_SHEETS_ID = 'YOUR_GOOGLE_SHEET_ID';
```
3. Replace with your credentials (see QUIZ_SETUP.md for detailed steps)

### Default Demo Mode:
- Shows 3 sample MCQ questions
- Stores submissions in browser (localStorage)
- Perfect for testing!

## 📱 Responsive Breakpoints
| Device | Width | Layout |
|--------|-------|--------|
| Desktop | > 768px | 2 columns |
| Tablet | 480-768px | 1 column |
| Mobile | < 480px | 1 column (optimized) |

## ⏱️ Customize Timers

**In quiz-app.js:**
```javascript
// Session starts in X minutes
sessionStartTime: new Date(new Date().getTime() + 30 * 60000)

// Quiz duration in minutes
quizDuration: 90
```

## 🎨 Customize Colors

**In quiz.css:**
```css
:root {
    --primary-purple: #7C3AED;           /* Change purple */
    --primary-purple-light: #A78BFA;     /* Light purple */
    --primary-purple-dark: #5B21B6;      /* Dark purple */
    --success-green: #10B981;            /* Green accent */
    --error-red: #EF4444;                /* Error red */
    --warning-yellow: #F59E0B;           /* Warning yellow */
}
```

## 📝 Customize Rules

**In quiz.html** (lines ~100-120):
```html
<div class="rule-item">
    <span class="rule-number">1</span>
    <p>Your custom rule here</p>
</div>
```

## 🔍 Testing

### Demo Questions Load? ✓
- Open browser console (F12)
- Look for: "Quiz app loaded successfully"
- Questions should be visible after timer counts to 0

### Submission Works? ✓
- Fill essay form
- Click "Submit Essay"
- Should show success message
- Check browser's localStorage to see saved data

### Timer Running? ✓
- Hours:Minutes:Seconds should count down
- Should update every second
- Countdown hint appears in red

## 🌐 NOT on Home Page Yet
✓ Standalone page  
✓ Access directly via `quiz.html`  
✓ Can be added to home page navigation later

## 🛠️ Production Notes

**Demo Mode** (Current):
- Questions stored in demo array
- Submissions saved to localStorage
- Perfect for frontend testing

**To Connect Real Google Sheets:**
1. Follow QUIZ_SETUP.md step-by-step
2. Get API Key from Google Cloud
3. Update quiz-app.js constants
4. Sheet should have "quiz_data" tab

**For Real Submissions:**
Need backend server to:
- Accept form submissions
- Write to Google Sheets
- Handle authentication
- See QUIZ_SETUP.md production section

## 📊 Data Structure

**Quiz Questions (from Google Sheets):**
```
Column A: Question text
Column B-E: Options (A-D)
Column F: Correct answer (A/B/C/D)
```

**Essay Submissions (saved):**
```json
{
  "timestamp": "6/9/2026, 9:30:00 PM",
  "studentName": "John Doe",
  "studentEmail": "john@example.com",
  "rollNumber": "12345",
  "essayLink": "https://docs.google.com/document/...",
  "essayNotes": "Optional notes",
  "mcqAnswers": { "question_1": "A", "question_2": "C" }
}
```

## ✨ Special Features

**Keyboard Shortcut:**
- `Ctrl+S` (or `Cmd+S` on Mac) to submit essay

**Auto-Persistence:**
- Session timers saved every 10 seconds
- Survive page refresh
- Restore on page load

**Progress Indicators:**
- Quiz timer changes color:
  - 🟢 Green (full time)
  - 🟡 Yellow (5 mins left)
  - 🔴 Red (critical time)

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Timer not updating | Refresh page, check console |
| Questions not showing | Timer needs to reach 0, check demo mode |
| Form won't submit | Check Google Drive link format |
| Dark theme looks wrong | Clear browser cache |
| Mobile layout broken | Check viewport meta tag present |

## 📞 Need Help?

1. Check browser console (F12 → Console tab)
2. Read QUIZ_SETUP.md for detailed guides
3. Look for error messages in Network tab
4. Verify file paths in HTML file

---

**Quiz Portal v1.0** | AkashaXplore 2026 | Ready to Use! ✨
