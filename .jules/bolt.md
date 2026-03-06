## 2026-03-05 - DocumentFragment for Batch DOM Appends
**Learning:** Appending multiple elements to a live DOM node in a loop causes unnecessary overhead. Using a `DocumentFragment` allows batching these appends in memory and performing a single update to the live DOM.
**Action:** Always use `DocumentFragment` or similar batching techniques when creating and appending multiple DOM elements in a loop.
