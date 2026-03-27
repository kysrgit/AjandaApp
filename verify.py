import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Route to block external fonts to prevent timeout
    page.route("https://fonts.googleapis.com/**", lambda route: route.abort())
    page.route("https://fonts.gstatic.com/**", lambda route: route.abort())

    # Navigate to local file
    page.goto("file:///app/index.html", wait_until="commit")
    page.wait_for_timeout(2000)

    # Bypass lock screen
    page.wait_for_function("typeof unlockApp === 'function'")
    page.evaluate("unlockApp()")
    page.wait_for_timeout(2000)

    # Locate the first fitness card
    fitness_card = page.locator('.workout-badge.fitness').first

    # Ensure it's visible
    fitness_card.wait_for(state="visible")

    # Focus the element using keyboard
    fitness_card.focus()
    page.wait_for_timeout(1000)

    # Take a screenshot before pressing Enter
    page.screenshot(path="/home/jules/verification/screenshots/before_enter.png")

    # Press Enter
    fitness_card.press("Enter")
    page.wait_for_timeout(1000)

    # Take a screenshot after pressing Enter (Modal should be open)
    page.screenshot(path="/home/jules/verification/screenshots/after_enter.png")

    # Close modal using Escape
    page.keyboard.press("Escape")
    page.wait_for_timeout(1000)

    # Focus the element again
    fitness_card.focus()
    page.wait_for_timeout(1000)

    # Press Space
    fitness_card.press("Space")
    page.wait_for_timeout(1000)

    # Take a screenshot after pressing Space (Modal should be open)
    page.screenshot(path="/home/jules/verification/screenshots/after_space.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()