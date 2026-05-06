## 2024-05-06 - Interactive Element Accessibility
**Learning:** Relying on default focus states isn't sufficient when components strip them via `outline: none`. Also, many icon-only buttons lacked proper screen reader context.
**Action:** Applied a global `:where()` pseudo-class for `:focus-visible` to ensure keyboard navigation visibility without overriding specific component states, and standardized ARIA labels for all icon-only buttons.
