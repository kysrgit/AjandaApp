## 2024-05-16 - Global Focus-Visible Rule
**Learning:** This application suppresses default browser outlines using `outline: none`, which creates a critical keyboard accessibility issue.
**Action:** Always add a global `:where(button, a, input, select, textarea):focus-visible` rule rather than individual classes to ensure explicit outlines without breaking mouse interactions. Also, dynamically created icon buttons (like `day-edit-btn` or `remove-class-btn`) must have explicit `aria-label` attributes set during their creation.
