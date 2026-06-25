## 2024-06-25 - Added ARIA labels to dynamic DOM elements
**Learning:** App-specific interactive elements (like the edit buttons dynamically generated via `app.js` innerHTML) were missing descriptive accessibility labels compared to static elements in the DOM.
**Action:** Always inspect JS components directly for unlabelled, dynamically created interactive elements such as icon-only action buttons.
