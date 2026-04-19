## 2026-04-19 - ARIA Labels on Icon Buttons
**Learning:** This application heavily relies on dynamic DOM creation for interactive elements (like edit buttons and class removal buttons) which lacked explicit accessibility labels.
**Action:** When working with vanilla JS templates or DOM manipulation, proactively check that dynamically generated interactive elements include necessary ARIA attributes, especially when they only contain icons or emojis.
