## 2026-04-08 - Interactive Div Keyboard Accessibility
**Learning:** Non-semantic tags like `div` used for interactive elements (`.workout-badge.clickable`) require explicit ARIA roles, tabindex, and keydown handlers (Enter/Space) to be fully keyboard accessible.
**Action:** Always use native `<button>` tags when possible, or implement the full keyboard accessibility pattern (`role="button"`, `tabindex="0"`, keydown handlers with `preventDefault()` for Space) when using non-semantic tags.
