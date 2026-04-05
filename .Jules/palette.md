## 2026-04-05 - Keyboard Accessibility for Non-Semantic Tags
**Learning:** Custom interactive elements using non-semantic tags (e.g., div tags like .workout-badge.clickable) require explicit keyboard accessibility.
**Action:** Add `role="button"`, `tabindex="0"`, and `keydown` event listeners for Enter and Space keys (preventing default for Space) to ensure accessibility.
