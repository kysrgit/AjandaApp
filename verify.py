import os
import time
from playwright.sync_api import sync_playwright

def verify():
    # Setup directories
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
        context = browser.new_context(record_video_dir="/home/jules/verification/videos")
        page = context.new_page()

        # Block fonts to prevent timeouts
        page.route("**/*.{woff,woff2,ttf,otf}", lambda route: route.abort())
        page.route("https://fonts.googleapis.com/**", lambda route: route.abort())
        page.route("https://fonts.gstatic.com/**", lambda route: route.abort())

        try:
            page.goto('file:///app/index.html', wait_until="commit")

            # Bypass lock screen
            page.wait_for_function("typeof unlockApp === 'function'")
            time.sleep(2)
            page.evaluate("unlockApp()")
            time.sleep(2)

            # Find the first clickable workout badge
            badge = page.locator(".workout-badge.clickable").first

            # Hover over it to show interaction
            badge.hover()
            time.sleep(0.5)

            # Focus the element via JS to ensure it's visually focused
            badge.focus()
            page.evaluate("document.querySelector('.workout-badge.clickable').focus()")
            time.sleep(1) # wait to capture focus outline

            # Take screenshot of focus state
            page.screenshot(path="/home/jules/verification/screenshots/verification.png")

            # Simulate Space key press
            badge.press("Space")

            # Wait for modal animation
            time.sleep(1)

        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    verify()
