## 2024-10-24 - Focus Visibility in Custom Components
**Learning:** The application heavily relies on `outline: none` for custom inputs and buttons without providing alternative focus indicators, breaking keyboard accessibility.
**Action:** Implemented a low-specificity global `:where():focus-visible` rule to restore base keyboard accessibility without conflicting with intentional custom focus states.
