## 2024-05-15 - Interactive div elements require keyboard accessibility
**Learning:** Found custom interactive `div` elements (like `.workout-badge.clickable`) in app.js lacking proper keyboard accessibility, meaning screen reader and keyboard users cannot trigger them.
**Action:** Added `role="button"`, `tabindex="0"`, and `keydown` listeners handling 'Enter' and 'Space' keys to ensure they meet basic accessibility guidelines.
