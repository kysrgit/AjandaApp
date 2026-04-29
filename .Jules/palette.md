## 2026-04-29 - Global Keyboard Accessibility
**Learning:** This application heavily uses custom styling and suppresses default outlines (e.g., `outline: none`) on many inputs and buttons, breaking keyboard navigation visibility. Global focus-visible fallbacks are essential when resetting outlines.
**Action:** Always implement a global `:focus-visible` utility when using CSS resets that remove outlines, to guarantee keyboard accessibility is preserved across all interactive elements.
