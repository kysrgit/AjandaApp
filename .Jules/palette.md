## 2026-04-17 - Icon-Only Button Accessibility and Global Focus States
**Learning:** The application heavily utilizes icon-only buttons (like settings, edit, close modals, AI chat) that were completely invisible to screen readers, and lacked explicit keyboard focus states, making keyboard navigation difficult to track visually.
**Action:** Implemented descriptive `aria-label` attributes on all icon-only buttons and added a global `*:focus-visible` rule using the app's primary theme color (`var(--fitness-color)`) to establish a consistent, accessible pattern for future components.
