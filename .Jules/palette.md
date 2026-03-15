## 2026-03-15 - Keyboard Accessibility for Custom Elements
**Learning:** When using non-semantic tags (like div or span) for interactive elements, they lack native keyboard focus and activation. Relying solely on click events excludes keyboard and screen reader users.
**Action:** Always add `role="button"`, `tabindex="0"`, and a `keydown` listener (handling 'Enter' and 'Space' with `e.preventDefault()` for 'Space' to stop scrolling) to make custom interactive elements fully accessible. Also, ensure a global `*:focus-visible` style is present for visual focus indication.
