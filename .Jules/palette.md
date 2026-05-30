## 2026-05-30 - Add ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons throughout the application's HTML and dynamically generated DOM components (e.g., injected via `innerHTML` or `document.createElement`) must include descriptive `aria-label` attributes to maintain screen reader accessibility. Always explicitly check JS files for dynamically created interactive elements.
**Action:** Consistently apply `aria-label` attributes to all icon-only buttons in both static HTML and JavaScript logic to ensure screen readers can accurately interpret and announce these elements.
