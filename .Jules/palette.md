## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** In this application, many icon-only buttons lacked accessible names. The issue existed not just in static HTML, but also in dynamically generated DOM elements and innerHTML strings within app.js, meaning static analysis alone isn't enough to catch all a11y issues.
**Action:** Always check both HTML files and dynamic JS template strings when verifying screen reader accessibility for interactive elements.
