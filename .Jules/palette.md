## 2023-10-27 - Focus Visible for Custom Modals
**Learning:** This app uses custom modal overlays and interactive custom buttons. The default browser focus outlines are often removed or not visible enough against the dark theme. Relying on default focus states is insufficient for keyboard navigation in this specific design system.
**Action:** Always implement a global `:focus-visible` rule using existing design tokens (like `var(--fitness-color)`) when working on dark-themed apps with custom interactive elements to ensure clear keyboard navigation paths.
