## 2024-06-06 - App specific outline suppression
**Learning:** The app suppresses default focus outlines on many components (e.g., `outline: none;`) without alternative states, breaking keyboard accessibility.
**Action:** Used `:where()` selector to globally re-enable `:focus-visible` styles for interactive elements, ensuring standard specificity is maintained and keyboard a11y is restored without overriding component-specific focus states if any exist.
