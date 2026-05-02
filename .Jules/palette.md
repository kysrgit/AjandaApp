## 2026-05-02 - Added Global Focus Visible States
**Learning:** The application extensively used `outline: none` on buttons and inputs without providing a fallback `:focus-visible` state, completely breaking keyboard navigation visibility. Global `:focus-visible` is essential when overriding default outlines.
**Action:** Always ensure a global or component-specific `:focus-visible` style is implemented whenever default browser outlines are removed to maintain keyboard accessibility.
