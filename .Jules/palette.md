## 2026-04-16 - Icon-only Buttons Accessibility
**Learning:** Found an accessibility issue pattern in the app's components where icon-only buttons (like settings, toggle visibility, and chat controls) are missing `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always add descriptive `aria-label` attributes to button elements that only contain icons or SVGs without visible text.
