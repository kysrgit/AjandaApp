## 2024-10-24 - Custom Interactive Elements Keyboard Accessibility
**Learning:** Custom interactive elements using non-semantic tags (like `div` with `.workout-badge.clickable`) in this app lack default keyboard accessibility, meaning users navigating with a keyboard cannot activate them.
**Action:** When creating or modifying custom interactive elements (e.g., `div` or `span` acting as buttons), always add `role="button"`, `tabindex="0"`, and attach a `keydown` event listener to handle `Enter` and `Space` keys (including `e.preventDefault()` to prevent scrolling).
