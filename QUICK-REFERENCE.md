# 🎪 Event Slider - Quick Reference

## 📂 Your Files

```
✅ event-slider.html              - Main component (open this first!)
✅ event-slider.css               - All styling
✅ event-slider.js                - Interactive features
✅ EVENT-SLIDER-README.md         - Full documentation
✅ event-slider-integration.html  - Integration guide
✅ QUICK-REFERENCE.md             - This file
```

## 🚀 Get Started in 3 Steps

### 1️⃣ Open Demo
Open `event-slider.html` in your browser to see the slider working.

### 2️⃣ Copy to Your Site
Copy the section from `event-slider.html` into your main page (e.g., `home.html` or `index.html`).

### 3️⃣ Link CSS & JS
Add these lines to your HTML `<head>`:
```html
<link rel="stylesheet" href="event-slider.css">
<script src="event-slider.js"></script>
```

Done! ✨

---

## 🎨 Quick Customization

### Change Primary Color
In `event-slider.css`, line 1-6:
```css
:root {
  --primary-color: #00d4ff;  /* Change this color */
}
```

### Add New Event Slide
In `event-slider.html`:
1. Find the last `<div class="event-slide">` block
2. Copy it entirely
3. Paste it after the last slide
4. Update the event details (name, description, date, image)
5. Add an indicator button in the `<div class="slider-indicators">` section

Example:
```html
<div class="event-slide">
  <div class="event-slide-content">
    <div class="event-slide-image">
      <img src="your-image.png" alt="Event Image">
    </div>
    <div class="event-slide-details">
      <div class="event-name">Your Event Name</div>
      <p class="event-description">Your description here</p>
      <div class="event-close-date">
        <span class="label">Registration Closes In:</span>
        <span class="date">31 Dec 2025 | 23:59 GMT</span>
      </div>
      <!-- Timer code... -->
    </div>
  </div>
</div>

<!-- Add this indicator too -->
<button class="indicator" data-index="3"></button>
```

### Update Button Actions
In `event-slider.js`, find `attachButtonHandlers()` and change:

```javascript
registerButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = 'your-registration-page.html';
  });
});
```

### Change Auto-Play Speed
In `event-slider.js`, find `startAutoplay()` and change the time:
```javascript
this.autoplayInterval = setInterval(() => {
  this.goToNext();
}, 6000);  // milliseconds (6000 = 6 seconds)
```

---

## ⌨️ User Interactions

| Action | Result |
|--------|--------|
| **Drag left/right** | Navigate to next/previous slide |
| **Click arrows** | Go to next/previous slide |
| **Click indicators** | Jump to specific slide |
| **Hover over slider** | Pause auto-play |
| **Swipe (mobile)** | Navigate slides |

---

## 📱 Responsive Breakpoints

| Device | Behavior |
|--------|----------|
| **Desktop** (1024px+) | 2-column layout, large images |
| **Tablet** (768-1024px) | Single column, medium images |
| **Mobile** (480-768px) | Single column, compact layout |
| **Small Mobile** (<480px) | Single column, minimal spacing |

---

## ⏱️ Countdown Timer

The timer automatically updates based on the date in:
```html
<span class="date">01 Jan 2026 | 23:59 GMT</span>
```

**Format:** `DD Mon YYYY | HH:MM GMT`

**Examples:**
- `01 Jan 2026 | 23:59 GMT` ✅
- `15 Feb 2026 | 18:30 GMT` ✅
- `31 Dec 2025 | 12:00 GMT` ✅

---

## 🎨 CSS Classes (for advanced customization)

### Container Classes
```css
.event-slider-container       /* Main wrapper */
.event-slider-wrapper         /* Slide container with glass effect */
.event-slides                 /* Slides container (applies transform) */
.event-slide                  /* Individual slide */
```

### Content Classes
```css
.event-slide-image           /* Left side image container */
.event-image                 /* Image element */
.event-slide-details         /* Right side details container */
.event-name                  /* Event title */
.event-description           /* Event description text */
.event-close-date            /* Registration close info */
.countdown-timer             /* Timer container */
.countdown-box               /* Individual timer box */
.event-buttons               /* Buttons container */
```

### Interactive Classes
```css
.slider-nav                  /* Navigation buttons */
.slider-nav-prev            /* Previous button */
.slider-nav-next            /* Next button */
.indicator                   /* Indicator dots */
.indicator.active           /* Active indicator dot */
```

---

## 🐛 Troubleshooting

### Slides not showing
- Check that image paths are correct
- Make sure CSS file is linked properly
- Verify no console errors (F12 → Console tab)

### Countdown timer showing zeros
- Check date format: `DD Mon YYYY | HH:MM GMT`
- Ensure date is in the future

### Drag not working
- Make sure JavaScript file is linked
- Check that you're not dragging on the image directly
- Try dragging on the text area instead

### Buttons not responding
- Verify button classes match HTML
- Check that JavaScript file is loaded
- Open console (F12) to see any errors

---

## 📊 File Sizes

- `event-slider.html`: ~8 KB
- `event-slider.css`: ~10 KB
- `event-slider.js`: ~8 KB
- **Total**: ~26 KB (very lightweight!)

---

## 🎯 Pro Tips

1. **Add Animations**: Modify `@keyframes` in CSS for custom animations
2. **Change Timing**: Adjust all `transition` and `animation` durations
3. **Custom Fonts**: Replace font-family with your preferred font
4. **Gradient Colors**: Use `linear-gradient()` for multi-color effects
5. **Add Shadow**: Adjust `--glass-shadow` for different shadow effects

---

## 📚 Full Documentation

For complete details, see:
- **EVENT-SLIDER-README.md** - Comprehensive documentation
- **event-slider-integration.html** - Integration guide with examples

---

## ✅ Checklist Before Going Live

- [ ] Test on desktop, tablet, and mobile
- [ ] Update all event details (names, descriptions, dates)
- [ ] Add real images for each event
- [ ] Update button actions to actual links
- [ ] Check countdown timer dates
- [ ] Test drag/swipe functionality
- [ ] Verify all color schemes match your brand

---

## 🎬 What's Next?

1. Open `event-slider.html` to see it in action
2. Copy the HTML into your main site
3. Update event details and images
4. Test on different devices
5. Deploy and enjoy! 🚀

---

**Questions?** Check the full documentation in `EVENT-SLIDER-README.md`

Made with ❤️ for Akasha Xplore 2026
