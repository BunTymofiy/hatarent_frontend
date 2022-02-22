const { test, expect, playwright, chromium } = require("@playwright/test");

test("Create a new property", async ({ page }) => {
  await page.goto("http://localhost:3000/add-property");
  await page.click("#InputEmail");
  await page.type("#InputEmail", "host@gmail.com");
  await page.click("#InputPassword");
  await page.type("#InputPassword", "host");
  await page.click("#Login");
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
  // await page.click("#submit");

//   // const url = await page.url();
//   // expect(url).toContain("/search");
//   // expect(page).  toMatchElement("#title", { text: "TestProperty" });
});

test("Check info a property", async ({ page }) => {
  await page.goto("http://localhost:3000/search?location=Longueuil%2C+Quebec%2C+Canada&startDate=2022-06-01T04%3A00%3A00.000Z&endDate=2022-06-04T04%3A00%3A00.000Z&numberOfGuests=1");
  await page.click("text=HostProperty1");
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  const url = page.url();
  expect(url).toContain("/info");
});

test("Update property", async ({ page }) => {
  await page.goto("http://localhost:3000/host-properties");
  await page.click("#InputEmail");
  await page.type("#InputEmail", "host@gmail.com");
  await page.click("#InputPassword");
  await page.type("#InputPassword", "host");
  await page.click("#Login");
  await page.click("text=HostProperty1");
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
