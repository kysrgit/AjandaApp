## 2026-04-20 - Icon-Only Button Accessibility Pattern
**Learning:** Icon-only buttons throughout the app (both in static HTML and dynamically generated DOM components like `day-edit-btn` and `remove-class-btn`) consistently rely on `title` attributes instead of `aria-label`.
**Action:** Always ensure `aria-label` is explicitly set alongside `title` for all icon-only buttons created in this repository, especially those generated dynamically via JavaScript.
