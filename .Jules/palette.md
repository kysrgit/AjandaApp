## 2026-04-12 - Missing Global Focus Indicators
**Learning:** The application lacks global focus-visible styles, making it hard to navigate using a keyboard as there is no visual indicator for focused elements. This is an accessibility issue pattern specific to this app's components, which rely on hover states but not focus states.
**Action:** Added a global `*:focus-visible` style in `style.css` to use the existing `--fitness-color` as the focus ring, ensuring a11y compliance for keyboard users.
