## 2024-06-25 - Dynamic DOM Accessibility Pattern
**Learning:** The application heavily relies on dynamic string-based DOM injection (via `innerHTML`) for interactive components like the edit class rows, which frequently lack essential accessibility attributes like `aria-label` for icon-only buttons.
**Action:** Always explicitly check JS template literals in addition to static HTML files for missing ARIA labels on interactable elements.
