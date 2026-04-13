## 2026-04-13 - Global Focus Ring Accessibility
**Learning:** Relying solely on input-specific focus styles leaves interactive elements like custom icon buttons without keyboard navigation feedback, breaking WCAG guidelines. A global `*:focus-visible` rule ensures a baseline accessible focus state across the entire application without degrading mouse user experience.
**Action:** Always implement a global `*:focus-visible` utility in the base CSS reset before building specific component styles.
