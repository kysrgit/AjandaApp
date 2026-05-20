## 2024-05-20 - Global focus-visible to combat outline: none
**Learning:** This app heavily uses `outline: none` on inputs and buttons, which completely removes browser default focus indicators, severely impacting keyboard accessibility.
**Action:** When a codebase aggressively strips outlines, applying a global `:where(a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])):focus-visible` rule helps restore focus states uniformly without causing `!important` specificity wars with component-level styles.
