## 2024-03-01 - [Initialization]
**Learning:** Initializing palette journal.
**Action:** None

## 2024-03-01 - [Keyboard Navigation on Custom Elements]
**Learning:** Custom interactive elements like `div.clickable` badges lack native keyboard accessibility features. Screen readers and keyboard users cannot activate them via Enter/Space or tab to them without manual intervention.
**Action:** When creating non-semantic custom interactive elements, always assign `role="button"`, add `tabindex="0"`, and attach event listeners for `keydown` (Enter/Space) along with global `:focus-visible` styling to ensure they behave like native buttons.
