## 2026-05-12 - Need explicit focus indicators
**Learning:** App relies heavily on `outline: none;` without providing a global `:focus-visible` fallback, breaking keyboard accessibility. Interactive elements need explicit focus outlines.
**Action:** Add a global `:focus-visible` style to interactive elements in `style.css` using `:where()`/`:is()` without `!important` to maintain specific component focuses while ensuring base accessibility.
