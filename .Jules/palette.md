## 2026-06-16 - Add ARIA Labels to Icon-Only Buttons
**Learning:** Icon-only buttons in this application, especially those injected dynamically via JavaScript (e.g., `innerHTML` or `document.createElement`), often lack `aria-label` attributes. This is a critical accessibility issue for screen reader users.
**Action:** Always ensure that all icon-only buttons, whether hardcoded in HTML or created dynamically via JS, explicitly define an `aria-label` attribute (in Turkish, matching the app's localization) to describe their function.
