## 2024-06-21 - Dynamic DOM Elements Need A11y Too
**Learning:** Icon-only buttons injected via JavaScript (like `innerHTML` in `app.js`) are just as important for accessibility as static HTML elements. It's easy to miss them when just grepping through `.html` files.
**Action:** Always explicitly check `.js` files for dynamically created interactive elements and ensure they include descriptive `aria-label` attributes.
