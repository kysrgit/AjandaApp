## 2024-05-26 - Accessible Icon-Only Buttons
**Learning:** Static HTML and dynamically generated JS components both frequently use icon-only buttons (`<button>✏️</button>`, `<button>✕</button>`). While `title` attributes provide tooltips, they are insufficient for accessibility. `aria-label` is required for screen readers.
**Action:** Always verify dynamically created interactive elements in JS files for missing `aria-label` attributes, not just static HTML files.
