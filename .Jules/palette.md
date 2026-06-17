## 2024-05-24 - Missing ARIA Labels in Dynamic JS Components
**Learning:** Icon-only buttons created dynamically via JavaScript (using `document.createElement` or template strings) frequently miss `aria-label` attributes, bypassing static HTML checks and creating hidden accessibility barriers.
**Action:** Always inspect JS files for dynamic UI component generation to ensure `aria-label` attributes are consistently applied, not just in static HTML templates.
