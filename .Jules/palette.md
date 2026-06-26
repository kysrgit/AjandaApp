## 2024-05-24 - ARIA labels for icon-only buttons
**Learning:** Icon-only buttons (both static and dynamically generated via JS) missing ARIA labels create accessibility barriers for screen readers. It's critical to inspect both HTML and JS DOM injection points for these missing labels.
**Action:** Always add descriptive `aria-label` attributes to icon-only buttons (`<button>`, `innerHTML`, `document.createElement('button')`) to ensure they are accessible. Use the application's localized language (e.g., Turkish for this app) for the labels.
