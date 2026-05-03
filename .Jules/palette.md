
## 2024-05-28 - Adding global focus-visible outlines
**Learning:** Specific input and button classes in this project commonly use `outline: none;` to suppress native browser outlines. This breaks keyboard navigation accessibility unless an explicit focus state is defined.
**Action:** Always append a global `:focus-visible` rule (e.g., `:focus-visible { outline: 2px solid var(--fitness-color); outline-offset: 2px; }`) to the main stylesheet to re-establish keyboard accessibility without affecting mouse users.
