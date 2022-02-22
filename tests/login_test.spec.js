const { test, expect, playwright, chromium } = require("@playwright/test");

test("Login", async ({ page }) => {
  const browser = await chromium.launch(); // Or 'chromium' or 'webkit'.
  const context = await browser.newContext({ storageState: 'state.json' });
 
  await page.goto("http://localhost:3000/login");
  await page.click("#InputEmail");
  await page.type("#InputEmail", "host@gmail.com");
  await page.click("#InputPassword");
  await page.type("#InputPassword", "host");
  await page.click("#Login");
  // await page.waitForNavigation({ waitUntil: "networkidle0" });
  const url = page.url();
  // expect(url).toContain("/");
//   await context.storageState({ path: 'state.json' });
//   await browser.close();
});
