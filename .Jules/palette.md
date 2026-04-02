## 2024-05-18 - Keyboard Accessibility for Non-Semantic Interactive Elements
**Learning:** Custom interactive elements built with `div` tags (like the workout badges) require manual keyboard accessibility management. Without `role="button"` and `tabindex="0"`, these elements are ignored by screen readers and keyboard navigation. The Space key scrolling behavior must also be overridden with `e.preventDefault()`.
**Action:** Always add `role="button"`, `tabindex="0"`, and `keydown` event listeners for `Enter` and `Space` when adding `click` listeners to `div`s or `span`s that act as buttons.
