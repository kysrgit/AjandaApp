## 2024-06-18 - App-Specific Dynamic Accessibility Pattern
**Learning:** The application dynamically generates several icon-only UI components via `innerHTML` (e.g., `addClassRow`, `renderWeeklyGrid`) which consistently lack `aria-label` attributes. This creates hidden accessibility gaps not caught by static HTML analysis.
**Action:** Always explicitly check JS files for dynamically created interactive elements when auditing accessibility for this application, not just static HTML files.
