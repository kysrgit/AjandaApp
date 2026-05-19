const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  // Try to find missing accessibility labels or focus issues
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.textContent.trim(),
      id: b.id,
      className: b.className,
      ariaLabel: b.getAttribute('aria-label'),
      title: b.getAttribute('title')
    }));
  });
  console.log("Buttons:", buttons);
  await browser.close();
})();
