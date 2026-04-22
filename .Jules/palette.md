## 2024-05-24 - Interactive Element Focus Outlines
**Learning:** This app suppresses default browser focus rings on buttons and inputs via `outline: none`, but doesn't implement a global `:focus-visible` rule to replace them. This makes keyboard navigation almost impossible to track for users who rely on tab navigation.
**Action:** Always verify that elements suppressing outlines have an alternative focus state (like `:focus-visible` with a distinct border or ring) to maintain keyboard accessibility without relying on custom classes per element.
