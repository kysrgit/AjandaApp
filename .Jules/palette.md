## 2024-06-03 - Added focus-visible global styles
**Learning:** Found that this application lacked global `:focus-visible` styles which suppresses default browser outlines because many inputs and buttons use `outline: none;` without providing alternative focus states.
**Action:** Always provide explicit global focus-visible states to ensure keyboard accessibility.
