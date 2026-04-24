## 2026-04-24 - Keyboard Focus and Icon Buttons
**Learning:** Interactive elements often lose native focus indicators when custom styles apply `outline: none`. Additionally, icon-only buttons with just `title` attributes may not be fully accessible.
**Action:** Always implement a global `:focus-visible` rule to ensure keyboard accessibility and add `aria-label` to all icon-only buttons.
