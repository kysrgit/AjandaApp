## 2024-05-19 - Added ARIA labels to dynamically created buttons
**Learning:** Icon-only buttons created dynamically via JavaScript (e.g., `innerHTML` or `document.createElement`) often miss accessibility attributes in this application. Screen readers will ignore the generic tooltips, so explicit `aria-label` attributes must be provided.
**Action:** Always explicitly set `aria-label` when generating icon-only buttons via DOM APIs or template literals.
