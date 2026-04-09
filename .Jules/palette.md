## 2024-06-25 - Custom Interactive Elements Need Keyboard Handlers
**Learning:** When using non-semantic HTML tags like `<div>` for custom interactive elements (e.g., `.workout-badge.clickable`), adding a click handler is insufficient for keyboard users.
**Action:** Always add `role="button"`, `tabindex="0"`, and a `keydown` listener that checks for 'Enter' or ' ' (Space) keys, remembering to `e.preventDefault()` for Space to prevent page scrolling.
