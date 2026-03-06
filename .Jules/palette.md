## 2024-05-24 - Interactive Elements Keyboard Accessibility
**Learning:** In this application, custom interactive elements built using non-semantic tags (like `.workout-badge.clickable` divs) lack inherent keyboard accessibility. They are purely mouse-driven.
**Action:** Always add `role="button"`, `tabindex="0"`, and `keydown` event handlers for `Enter` and `Space` (with `e.preventDefault()` to prevent scrolling) to ensure full keyboard navigation compliance for custom interactive components.
