## 2026-04-11 - Keyboard Accessibility for Non-Semantic Clickables
**Learning:** Custom interactive elements (like div.workout-badge.clickable) lack native keyboard support (tabbing, Enter/Space activation) which breaks a11y for users relying on keyboard navigation.
**Action:** Always add role='button', tabindex='0', and handle 'keydown' events (Enter/Space) with preventDefault() for non-semantic interactive elements.
