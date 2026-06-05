## 2024-06-05 - Global Focus Styles vs Component Resets
**Learning:** This application's specific components (like `.edit-input`, `.chat-input`, etc.) use `outline: none` which unintentionally removes keyboard focus accessibility.
**Action:** Use a global `:is(a, button, input, textarea, select, [tabindex="0"]):focus-visible` with standard specificity to provide default outlines, ensuring accessibility isn't lost when components strip default outlines.
