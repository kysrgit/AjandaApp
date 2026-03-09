## 2024-05-24 - Keyboard Accessibility for Custom Interactive Elements
**Learning:** Custom interactive elements using non-semantic tags (like `div` tags for `.workout-badge.clickable`) need explicit ARIA roles, tabindex, and keyboard event listeners (Enter/Space) to be fully accessible.
**Action:** When creating clickable non-semantic elements, always add `role="button"`, `tabindex="0"`, and a keydown listener for Enter and Space keys (preventing default for Space to avoid scrolling).
