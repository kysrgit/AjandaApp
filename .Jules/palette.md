## 2024-03-24 - Missing ARIA Labels on Icon Buttons
**Learning:** The application heavily relies on icon-only buttons (like ✕, ✏️, and SVG icons) both in static HTML and dynamically generated via JS, which lack `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always verify icon-only buttons for `aria-label`s, especially checking JS files for buttons dynamically created via `document.createElement` or `innerHTML`.
