## 2024-05-01 - Missing ARIA labels on icon-only buttons
**Learning:** Found a recurring pattern in this app where icon-only buttons (like settings, toggle visibility, and chat controls) are missing descriptive `aria-label` attributes. This applies to both static HTML and dynamically generated components in JS.
**Action:** Always verify icon-only buttons have descriptive Turkish `aria-label` attributes to maintain screen reader accessibility.
