## 2024-05-15 - Initial Journal Setup
**Learning:** Initialized journal for tracking critical UX/a11y learnings.
**Action:** Will append new learnings here as discovered.

## 2024-05-15 - Keyboard Accessibility for Custom Interactive Elements
**Learning:** When using custom interactive elements with non-semantic tags (like `div` tags styled as buttons such as `.workout-badge.clickable`), simply adding a `click` listener and a hover state is insufficient. Keyboard users cannot access or activate these elements.
**Action:** Always implement keyboard accessibility for these elements by adding `role="button"`, `tabindex="0"`, and a `keydown` event listener for the `Enter` and `Space` keys. Ensure to call `e.preventDefault()` when the `Space` key is pressed to stop the page from scrolling.
