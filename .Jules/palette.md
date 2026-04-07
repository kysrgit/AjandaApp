## 2024-04-07 - Non-Semantic Interactive Elements in Weekly Grid
**Learning:** The application uses non-semantic div tags (.workout-badge.clickable) for primary interactive actions like opening fitness programs, which breaks keyboard navigation for users relying on tab order.
**Action:** Always ensure that custom interactive div elements receive role="button", tabindex="0", and keyboard event handlers (Enter/Space) to maintain basic accessibility compliance when semantic button tags cannot be used.
