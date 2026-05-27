## 2024-05-24 - Icon Button ARIA Labels
**Learning:** The application uses icon-only buttons dynamically created in JavaScript (like `day-edit-btn` and `remove-class-btn`) and in HTML (like `settings-btn` and `chat-fab`). These lacked `aria-label`s, rendering them inaccessible to screen readers.
**Action:** Explicitly set `aria-label` via `setAttribute` on dynamically generated elements and `aria-label` attribute on HTML elements in `app.js` and `index.html`. Always check both static HTML and JS files for icon-only interactive elements to ensure comprehensive accessibility coverage.
