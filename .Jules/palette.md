## 2024-05-04 - ARIA Labels and Keyboard Focus
**Learning:** Icon-only buttons frequently miss `aria-label`s, and relying solely on class-based focus styles often leaves out global keyboard focus visibility (`:focus-visible`).
**Action:** Always add descriptive `aria-label` attributes to icon-only interactive elements and establish a global `*:focus-visible` CSS rule to ensure baseline keyboard accessibility across all components.
