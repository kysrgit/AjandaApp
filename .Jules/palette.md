## 2026-04-02 - Adding keyboard accessibility to custom non-semantic interactive elements
**Learning:** Non-semantic interactive elements like div tags with clickable classes require manual addition of role, tabindex, and keydown listeners to be accessible via keyboard.
**Action:** When adding custom interactive elements using non-semantic tags, always implement keyboard accessibility by adding role='button', tabindex='0', and keydown event listeners for Enter and Space keys.
