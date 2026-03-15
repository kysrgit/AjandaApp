import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Block fonts to prevent timeouts
        page.route("**/*.{woff,woff2,ttf,otf}", lambda route: route.abort())
        page.route("**/fonts.googleapis.com/**", lambda route: route.abort())
        page.route("**/fonts.gstatic.com/**", lambda route: route.abort())

        # Load app
        page.goto("file:///app/index.html", wait_until="commit")

        # Wait for unlocking app
        time.sleep(2)

        # Unlock app using the global function
        page.evaluate("if (typeof unlockApp === 'function') unlockApp();")
        time.sleep(2) # wait for scripts and animation

        # Wait for the main app container to be visible
        page.wait_for_selector("#app-main:not(.hidden)", state="visible")

        # Click a workout badge via keyboard simulation
        # The first clickable badge should be focused and pressed Space on
        badge_selector = ".workout-badge.clickable"
        page.wait_for_selector(badge_selector)

        # Get the first badge and simulate keyboard
        badge = page.locator(badge_selector).first
        badge.focus()
        page.keyboard.press("Space")

        # Wait for the modal to be visible
        page.wait_for_selector("#modal-overlay.active", state="visible")

        print("UI test passed: Workout badge triggered modal using Space key.")

        # Simulate Escape to close
        page.keyboard.press("Escape")
        page.wait_for_selector("#modal-overlay:not(.active)")
        print("UI test passed: Modal closed using Escape key.")

        browser.close()

if __name__ == "__main__":
    run()
