# 🧪 Real-Time Timer Testing Checklist

## Quick Test Setup

To test quickly with shorter timers:

**Edit quiz-app.js line 32:**
```javascript
// Change from: 30 * 60000 (30 minutes)
// To: 10 * 1000 (10 seconds for quick testing)
QUIZ_CONFIG.sessionStartTime = new Date(now.getTime() + 10 * 1000);
```

**Edit quiz-app.js line 12:**
```javascript
// Change from: 90 (90 minutes)
// To: 1 (1 minute for quick testing)
quizDuration: 1,
```

## Testing Scenarios

### ✓ Test 1: Smooth Countdown
```
Steps:
1. Open quiz.html
2. Watch the timer display
3. Seconds should count down smoothly (every 100ms update)
4. No jumps or skips

Expected: 00:00:15, 00:00:14, 00:00:13... (smooth progression)
```

### ✓ Test 2: Page Refresh Persistence
```
Steps:
1. Open quiz.html
2. Wait 5 seconds, note timer value (e.g., 00:00:10)
3. Press F5 to refresh page
4. Check timer immediately (should be ~00:00:10 or less, NOT reset)

Expected: Timer continues from where it left off
Result: PASS ✓ if within 1 second of expected
```

### ✓ Test 3: Tab Close & Reopen
```
Steps:
1. Open quiz.html
2. Wait 5 seconds, note exact timer value
3. Close the tab (Ctrl+W or ⌘+W)
4. Open quiz.html again in a new tab
5. Timer should continue

Expected: Timer resumes within 2 seconds
Result: PASS ✓ if timer is less than expected + 2 seconds
```

### ✓ Test 4: Browser Window Close & Reopen
```
Steps:
1. Open quiz.html
2. Wait 5 seconds, note timer value
3. Close browser completely
4. Reopen browser and quiz.html
5. Timer should continue

Expected: Timer resumes (time will have advanced by browser close duration)
Result: PASS ✓ if quiz continues correctly
```

### ✓ Test 5: Session Activation
```
Steps:
1. With 10 second timer (from setup above), open quiz.html
2. Watch for "Quiz Session Active" message
3. Watch for "Session Starts In" timer to reach 00:00:00
4. Questions should appear automatically
5. Quiz timer should appear

Expected: 
- Status changes to "Quiz Session Active"
- Questions appear
- Quiz timer becomes visible

Result: PASS ✓ if all three happen
```

### ✓ Test 6: Quiz Timer During Active Session
```
Steps:
1. Wait for quiz to activate (from Test 5)
2. Quiz timer should show (e.g., 00:01:00 for 1 minute)
3. Watch timer countdown smoothly
4. Refresh page - timer continues

Expected:
- Quiz timer counts down
- Survives refresh

Result: PASS ✓ if timer continues after refresh
```

### ✓ Test 7: Timer Color Progression
```
Steps:
1. During active quiz, wait for timer to reach <15 minutes
2. Should change from green to yellow
3. Wait more, reach <5 minutes
4. Should change to red

Expected:
- 00:15:00 or more: GREEN
- 00:05:00 to 00:14:59: YELLOW
- Below 00:05:00: RED

Result: PASS ✓ if colors change at thresholds
```

### ✓ Test 8: localStorage Inspection
```
Steps:
1. Open quiz.html
2. Open browser DevTools (F12)
3. Go to "Application" → "Storage" → "localStorage"
4. Look for "quizSessionState" key
5. Click to view its value

Expected: JSON with format:
{
  "sessionStartTime": 1686415200000,
  "quizEndTime": null,
  "isSessionActive": false,
  "isQuizStarted": false,
  "lastSaveTime": 1686415180000
}

Result: PASS ✓ if data is present and valid
```

### ✓ Test 9: Multiple Devices Sync
```
Steps:
1. Open quiz.html on Device A
2. Note timer value (e.g., 00:15:30)
3. Open quiz.html on Device B
4. Timers will likely differ (different sessions started)

Expected:
- Each device has independent timer
- Both count down correctly
- If same device reloaded, same timer continues

Result: PASS ✓ if independent operation confirmed
```

### ✓ Test 10: Long Running (Leave Open)
```
Steps:
1. Open quiz.html
2. Leave it open for 30+ minutes
3. Check periodically
4. Timer should continue accurately

Expected:
- Timer keeps running
- No drift or errors
- Smooth updates throughout

Result: PASS ✓ if no issues over long duration
```

## Performance Checks

### Console Errors
```
Steps:
1. Open quiz.html
2. Open DevTools (F12)
3. Go to Console tab
4. Look for red errors

Expected: No red errors
Result: PASS ✓ if console is clean or only warnings
```

### Memory Usage
```
Steps:
1. Open DevTools → Performance tab
2. Record 10 seconds
3. Check memory graph

Expected: Flat memory usage (no constant growth)
Result: PASS ✓ if no memory leak detected
```

### CPU Usage
```
Steps:
1. Open quiz.html
2. Monitor CPU usage
3. Should be minimal

Expected: <5% CPU usage during timer updates
Result: PASS ✓ if efficient
```

## Troubleshooting Tests

### If Timer Doesn't Update:
```javascript
// In console (F12), run:
console.log('Current time:', new Date());
console.log('Session start:', new Date(JSON.parse(localStorage.getItem('quizSessionState')).sessionStartTime));
console.log('Time remaining:', new Date(JSON.parse(localStorage.getItem('quizSessionState')).sessionStartTime) - new Date());
```

### If localStorage Not Saving:
```javascript
// In console (F12), run:
localStorage.setItem('test', 'works');
console.log(localStorage.getItem('test'));
// Should print: "works"
```

### If Timer Resets:
```javascript
// Check if localStorage is being cleared:
localStorage.clear(); // Don't actually run this!
// Try private/incognito mode - this disables storage
```

## Success Criteria

| Test | Must Pass |
|------|-----------|
| Smooth Countdown | ✓ |
| Refresh Persistence | ✓ |
| Close/Reopen Persistence | ✓ |
| Session Activation | ✓ |
| Quiz Timer Countdown | ✓ |
| Color Progression | ✓ |
| localStorage Data | ✓ |
| No Console Errors | ✓ |
| Minimal CPU Usage | ✓ |

**Overall Result: PASS if 8/9 tests pass**

## Report Results

When testing is complete, verify:
- [ ] All 10 scenarios tested
- [ ] No critical issues found
- [ ] Timer is smooth and accurate
- [ ] Persistence works correctly
- [ ] Ready for production

---

**Testing v1.0** | Real-Time Quiz Timer 🎓
