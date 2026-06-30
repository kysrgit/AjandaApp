## 2024-05-18 - Missing ARIA labels on dynamic icon buttons
**Learning:** Found multiple instances where `innerHTML` string interpolation or `document.createElement` adds icon-only buttons (like edit/remove buttons in `app.js`) without descriptive ARIA labels. This is a common pattern in the app's dynamic rendering.
**Action:** Always ensure dynamic icon-only elements have `aria-label` or `title` mapped correctly. Focus on `app.js` which manages rendering of `day-edit-btn`, `remove-class-btn` etc.
