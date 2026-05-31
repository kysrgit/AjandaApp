## 2024-06-01 - Missing ARIA Labels on Dynamic DOM Elements
**Learning:** This application dynamically injects interactive elements (like edit and delete buttons) directly via innerHTML or document.createElement in app.js, omitting essential accessibility attributes like `aria-label` for icon-only elements.
**Action:** Always check both static HTML files and JavaScript files for dynamically created interactive elements when auditing for basic accessibility attributes.
