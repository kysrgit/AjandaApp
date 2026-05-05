## 2026-05-05 - Global Focus-Visible Fallback
**Learning:** Interactive elements in this app suppress default browser outlines via `outline: none`, completely breaking keyboard accessibility.
**Action:** Adding a global `:focus-visible` fallback is necessary to restore keyboard navigation without disrupting mouse-driven interactions.
