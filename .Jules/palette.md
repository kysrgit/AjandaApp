## 2024-05-18 - App Accessibility Pattern
**Learning:** Relying on component-specific `outline: none` suppresses keyboard focus indicators. Standard practice is to provide a global `:focus-visible` outline.
**Action:** Add global `:is(button, a, input, select, textarea, [tabindex]):focus-visible` to ensure focus states are visible for all interactive elements across the application without overriding intentional component visual designs by using `!important`.
