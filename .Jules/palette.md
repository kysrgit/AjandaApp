## 2024-05-24 - Keyboard Accessibility for Non-semantic Elements
**Learning:** Custom interactive elements built with `div` tags (e.g., `.workout-badge.clickable`) lack native keyboard support, preventing screen reader and keyboard-only users from interacting with them.
**Action:** Always implement keyboard accessibility for non-semantic interactive elements by adding `role="button"`, `tabindex="0"`, and `keydown` event handlers for `Enter` and `Space` keys (including `e.preventDefault()` to prevent page scroll).
