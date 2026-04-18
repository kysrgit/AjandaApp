## 2026-04-18 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Found several icon-only buttons (like settings, close buttons, and chat fab) lacking `aria-label` attributes in both the static HTML and dynamically generated DOM components, which makes them inaccessible to screen readers.
**Action:** Always verify that buttons containing only icons (SVG, emojis, or text symbols like '✕') have descriptive `aria-label` attributes to maintain accessibility.
