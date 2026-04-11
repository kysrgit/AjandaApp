1. **Add `*:focus-visible` styles to `style.css`**
   - Provide a clear, globally accessible focus indicator by appending `:focus-visible` to existing interactive elements or globally using `var(--fitness-color)`.
2. **Improve `div.workout-badge.clickable` keyboard accessibility in `app.js`**
   - The memory states: `Custom interactive elements using non-semantic tags (e.g., div tags like .workout-badge.clickable) must implement keyboard accessibility by adding role="button", tabindex="0", and keydown event listeners for the Enter and Space keys, including e.preventDefault() to stop the page from scrolling when pressing space.`
   - Ensure the element uses `tabindex="0"`, `role="button"` and responds to `Enter` and `Space`.
3. **Verify the UI using Playwright**
   - Take a screenshot as instructed by the repository constraints, bypass the lockscreen if needed, and verify visual and functional changes.
4. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
5. **Submit the PR**
   - Title: `🎨 Palette: Keyboard Accessibility for Workout Badges`
