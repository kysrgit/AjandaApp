## 2024-05-24 - DocumentFragment for DOM Appends
**Learning:** In vanilla JavaScript, appending items directly to the DOM within a loop (e.g., `container.appendChild()` inside `.forEach()`) can cause layout thrashing and negatively impact performance, particularly with larger lists.
**Action:** Use `document.createDocumentFragment()` to batch DOM operations. Append items to the fragment within the loop, and then append the complete fragment to the target DOM element outside the loop.
