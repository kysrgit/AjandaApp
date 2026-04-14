## 2024-10-27 - Icon Button Accessibility
**Learning:** In vanilla JS applications, dynamically generated icon buttons (like 'Edit' or 'Remove') frequently miss screen reader announcements if their aria-label is not explicitly set alongside title.
**Action:** Always include .setAttribute('aria-label', value) alongside .title in DOM-constructed icon buttons.
