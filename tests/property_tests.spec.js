const { test, expect, playwright, chromium } = require("@playwright/test");

test("Create a new property", async ({ page }) => {
  await page.goto("http://localhost:3000/add-property");
  await page.click("#title");
  await page.type("#title", "TestProperty");
  await page.click("#guestLimit");
  await page.type("#guestLimit", "2");
  await page.click("#contact_person");
  await page.type("#contact_person", "TestPerson");
  await page.click("#email");
  await page.type("#email", "test@gmail.com");
  await page.click("#description");
  await page.type("#description", "TestDescription");
  await page.click(".mapboxgl-ctrl-geocoder--input", { clickCount: 0 });
  await page.type(".mapboxgl-ctrl-geocoder--input", "751 Rue Le Caron");
  await page.click(".mapboxgl-ctrl-geocoder--suggestion", { clickCount: 0 });
//   await page.click("#submit");

//   // const url = await page.url();
//   // expect(url).toContain("/search");
//   // expect(page).  toMatchElement("#title", { text: "TestProperty" });
});

test("Check info a property", async ({ page }) => {
  await page.goto("http://localhost:3000/search");
  await page.click("text=TestProperty");
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  const url = page.url();
  expect(url).toContain("/info");
});

test("Update property", async ({ page }) => {
  await page.goto("http://localhost:3000/search");
  await page.click("text=TestProperty");
  await page.click("#update");
  await page.click("#title");
  await page.type("#title", "TestPropertyUpdated");
  await page.click("#guestLimit");
  await page.type("#guestLimit", "5");
  await page.click("#contact_person");
  await page.type("#contact_person", "TestPersonUpdated");
  await page.click("#email");
  await page.type("#email", "test@gmail.com");
  await page.click("#description");
  await page.type("#description", "TestDescription");
  await page.click(".mapboxgl-ctrl-geocoder--input", { clickCount: 0 });
  await page.type(".mapboxgl-ctrl-geocoder--input", "751 Rue Le Caron");
  await page.click(".mapboxgl-ctrl-geocoder--suggestion", { clickCount: 0 });
  // await page.click("#submit");
});
