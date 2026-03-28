import time
from playwright.sync_api import sync_playwright

def test_ui():
    with sync_playwright() as p:
        # We need to test local file, disable sandbox
        browser = p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
        context = browser.new_context(record_video_dir="/home/jules/verification/video")
        page = context.new_page()

        # Block fonts to prevent timeouts
        page.route("**/*", lambda route: route.abort() if route.request.url.startswith("https://fonts.") else route.continue_())

        print("Navigating to index.html...")
        page.goto("file:///app/index.html", wait_until="commit")

        print("Waiting for unlockApp function...")
        page.wait_for_function("typeof unlockApp === 'function'")

        print("Waiting 2s before unlock...")
        time.sleep(2)

        print("Unlocking app...")
        page.evaluate("unlockApp()")

        print("Waiting 2s after unlock...")
        time.sleep(2)

        print("Pressing Tab to navigate to the first clickable workout badge...")
        # Press tab multiple times to reach the badge. It's inside the grid.
        # Let's just focus it directly for the test, or we can use locator focus to simulate tab
        badge = page.locator(".workout-badge.clickable").first
        badge.focus()

        print("Pressing Enter to open modal...")
        page.keyboard.press("Enter")

        print("Checking if modal is open...")
        modal_title = page.locator("#modal-title")
        modal_title.wait_for(state="visible", timeout=5000)
        print("Modal opened successfully!")

        print("Closing modal with Escape...")
        page.keyboard.press("Escape")
        time.sleep(1)

        print("Pressing Space to open modal again...")
        badge.focus()
        page.keyboard.press("Space")

        modal_title.wait_for(state="visible", timeout=5000)
        print("Modal opened successfully with Space!")

        context.close()
        browser.close()

if __name__ == "__main__":
    test_ui()
