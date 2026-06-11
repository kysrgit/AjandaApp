## 2025-02-18 - Missing ARIA Labels on Dynamic Elements
**Learning:** This app heavily relies on dynamically creating icon-only UI elements (via `document.createElement` and `innerHTML` in `app.js`) without accessibility considerations, leading to missing screen reader context.
**Action:** Always manually inspect JS files for dynamically generated interactive elements and ensure `.setAttribute('aria-label', '...')` or equivalent HTML attributes are explicitly added for screen reader accessibility.
