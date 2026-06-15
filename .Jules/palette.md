## 2024-06-15 - Missing ARIA Labels on Icon Buttons
**Learning:** Icon-only buttons throughout the HTML and dynamically generated DOM components (e.g., injected via `innerHTML` or `document.createElement`) frequently lack descriptive `aria-label` attributes or rely only on `title`, which isn't sufficient for all screen readers.
**Action:** Always explicitly check both static HTML files and JS files for dynamically created interactive elements to ensure they include comprehensive `aria-label` attributes.
