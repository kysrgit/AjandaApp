## 2025-03-01 - [Hoisting Expensive Computations & Batching DOM Updates]
**Learning:** Instantiating `new Date()` inside an iteration of a rendering loop (`renderWeeklyGrid` via `isTodayIndex`) combined with multiple sequential DOM reflows by individually appending generated children to an active document node severely drops performance.
**Action:** Compute necessary static values outside of loops and always batch DOM manipulation by attaching generated element trees to a `DocumentFragment` before injecting them into the DOM as a single operation.
