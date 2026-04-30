## 2026-04-30 - Accessible Interactive Elements
**Learning:** Applying `outline: none` directly to buttons or inputs breaks native keyboard focus state unless replaced globally with `:focus-visible`, and icon-only buttons require descriptive `aria-label`s to communicate intent to screen readers.
**Action:** Added global `:focus-visible` to ensure visual keyboard navigation support and appended `aria-label`s to `edit-btn`, `settings-btn`, `chat-fab`, `chat-send`, `remove-class-btn`, and `toggle-key-vis` buttons across the application.
