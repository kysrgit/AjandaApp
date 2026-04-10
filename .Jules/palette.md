## 2026-04-10 - Interactive Element Accessibility
**Learning:** Custom interactive elements using non-semantic tags like `.workout-badge.clickable` need explicit keyboard support.
**Action:** Add `role="button"`, `tabindex="0"`, and `keydown` handlers for Enter/Space (with `e.preventDefault()`) to ensure keyboard accessibility.
