## 2026-07-06 - App-Specific Dynamic Accessibility Pattern
**Learning:** Found a systemic pattern where icon-only buttons dynamically created in JS (like `day-edit-btn` and `remove-class-btn` in app.js) consistently omit accessibility attributes like `aria-label`, whereas some static HTML buttons correctly include them (like `modal-close`). This indicates a gap in the dynamic component generation workflow for accessibility.
**Action:** Always explicitly audit JS injection functions (`createElement`, `innerHTML`) for missing `aria-label` attributes on interactive elements in this app.
