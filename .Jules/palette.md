## 2026-04-23 - Keyboard Focus Styles
**Learning:** Many interactive components suppress default browser outlines with `outline: none`, making keyboard navigation difficult for users relying on tab targeting.
**Action:** Always implement a global `:focus-visible` rule in the base stylesheet so that keyboard users receive explicit visual feedback regardless of component-level outline overrides.
