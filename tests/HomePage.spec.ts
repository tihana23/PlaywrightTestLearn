import { test, expect } from "@playwright/test";
import { verifyNextAndPreviousButton } from "../ReusableMethod/Methods";

test("Verify that webpage has title", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  await expect(page).toHaveTitle("STORE");
});

test("Verify that homepage load test", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const homePageElement = page.getByText("Home");

  await expect(homePageElement).toBeVisible();
});

test("Verify that contact page is open correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const contactsLink = page.getByRole("link", { name: "Contact" });

  await contactsLink.click();
  await page.waitForSelector("label.form-control-label", {
    state: "visible",
    timeout: 5000,
  });
  const contactEmailLabel = page.locator("label.form-control-label", {
    hasText: "Contact Email:",
  });
  await expect(contactEmailLabel).toBeVisible();
});

test("Verify that About us can be oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const aboutUsLink = page.getByRole("link", { name: "About us" });
  aboutUsLink.click();
  const closeButton = page.locator(
    "#videoModal .modal-footer >> button.btn.btn-secondary",
    { hasText: "Close" }
  );
  await expect(closeButton).toBeVisible();
});

test("Verify that Chart page is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const cartLink = page.getByRole("link", { name: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
});

test("Verify that Login popup is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const loginLink = page.getByRole("link", { name: "Log in" });
  loginLink.click();
  const logInCloseButton = page.locator("#logInModal .close");
  await expect(logInCloseButton).toBeVisible();
});
test("Verify that Register popup is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const registerLink = page.getByRole("link", { name: "Sign up" });
  registerLink.click();
  const registerCloseButton = page.locator("#signInModal .close");

  await expect(registerCloseButton).toBeVisible();
});

test("Verify that Logout button is woking correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  await page.click("a#login2");
  const username1 = "tihana";
  const password1 = "123456";
  await page.fill('input[id="loginusername"]', username1);
  await page.fill('input[id="loginpassword"]', password1);
  await page.click('button[onclick="logIn()"]');
  await expect(page.locator("a#nameofuser")).toContainText("Welcome tihana");
  const logoutButton = page.locator("#logout2");
  await logoutButton.click();
  await expect(logoutButton).toBeHidden();
  const loginLink = page.locator("a.nav-link", { hasText: "Log in" });
  await expect(loginLink).toBeVisible();
});

test("Verify that next button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const nextButtonSelector = page.locator("span.sr-only", { hasText: "Next" });

  const expectedSlides = [
    { src: "Samsung1.jpg", alt: "First slide" },
    { src: "nexus1.jpg", alt: "Second slide" },
    { src: "iphone1.jpg", alt: "Third slide" },
  ];
  await verifyNextAndPreviousButton(page, nextButtonSelector, expectedSlides);
});
test("Verify that Previous button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const previousButtonSelector = page.locator("span.sr-only", {
    hasText: "Previous",
  });

  const expectedSlides = [
    { src: "Samsung1.jpg", alt: "First slide" },
    { src: "iphone1.jpg", alt: "Third slide" },
    { src: "nexus1.jpg", alt: "Second slide" },
  ];
  await verifyNextAndPreviousButton(
    page,
    previousButtonSelector,
    expectedSlides
  );
});

test("Verify that categories text is displyed", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const phonesCategory = page.locator("text=CATEGORIES");
  await expect(phonesCategory).toBeVisible();
});

test("Verify that Phone Laptop Minitors categories are displayed", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const phonesCategory = page.locator("text=Phones");
  await expect(phonesCategory).toBeVisible();

  const laptopsCategory = page.locator("text=Laptops");
  await expect(laptopsCategory).toBeVisible();

  const monitorsCategory = page.locator("text=Monitors");
  await expect(monitorsCategory).toBeVisible();
});

test("Verify that one item can be clicked and visible on the other page", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const phonesCategory = page.locator("text=Phones");
  await expect(phonesCategory).toBeVisible();
  await phonesCategory.click();
  const samsungGalaxyS6Link = page.locator("a.hrefch", {
    hasText: "Samsung galaxy s6",
  });
  await samsungGalaxyS6Link.click();
  const samsungGalaxyS6Header = page.locator("h2.name", {
    hasText: "Samsung galaxy s6",
  });
  await expect(samsungGalaxyS6Header).toBeVisible();
});

test("Verify that one item from home page and Phone categories is visible and can be selected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const phonesCategory = page.locator("text=Phones");
  await expect(phonesCategory).toBeVisible();
  await phonesCategory.click();
  const categoryPhone = page.locator("text=Phones");
  await expect(categoryPhone).toBeVisible();
  await categoryPhone.click();
  const samsungGalaxyS6Link = page.locator("a.hrefch", {
    hasText: "Samsung galaxy s6",
  });
  await samsungGalaxyS6Link.click();
  const samsungGalaxyS6Header = page.locator("h2.name", {
    hasText: "Samsung galaxy s6",
  });
  const isProductTitlePresent = await page.locator("h2.name").textContent();
  await expect(isProductTitlePresent).toBeTruthy();
  await expect(samsungGalaxyS6Header).toBeVisible();
});
test("Verify that one item from home page and Laptops categories is visible and can be selected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const categoryLaptops = page.locator("text=Laptops");
  await expect(categoryLaptops).toBeVisible();

  await categoryLaptops.click();

  const laptopLink = page.locator("a.hrefch", {
    hasText: "Sony vaio i5",
  });
  await expect(laptopLink).toBeVisible();
  await laptopLink.click();
  const laptopHeader = page.locator("h2.name", {
    hasText: "Sony vaio i5",
  });
  await page.locator("h2.name").textContent();
  await expect(laptopHeader).toBeVisible();
});
test("Verify that one item from home page and Monitors categories is visible and can be selected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const categoryMonitors = page.locator("text=Monitors");
  await expect(categoryMonitors).toBeVisible();
  await categoryMonitors.click({ timeout: 10000 });
  const monitorLink = page.locator("a.hrefch", {
    hasText: "Apple monitor 24",
  });
  await monitorLink.click({ timeout: 10000 });
  const monitorHeader = page.locator("h2.name", {
    hasText: "Apple monitor 24",
  });

  await expect(monitorHeader).toBeVisible();
});

test("Verify that Categories gird is working as excepted on Next and previous button", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  //svi popis svih itema
  await page.locator('a.hrefch:has-text("Samsung galaxy s6")').waitFor();
  let firstPageItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );

  await page.click('button[id="next2"]');

  await page.locator('a.hrefch:has-text("Apple monitor 24")').waitFor();
  let nextItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );

  expect(nextItems.length).toBeGreaterThan(0);
  expect(nextItems).not.toEqual(firstPageItems);
  await page.click('button[id="prev2"]');

  await page.locator('a.hrefch:has-text("Samsung galaxy s7")').waitFor();
  let previousItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );

  expect(previousItems).not.toEqual(nextItems);

  await page.click('button[id="next2"]');
  await page.locator('a.hrefch:has-text("Samsung galaxy s7")').waitFor();
  let againNextItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );

  expect(nextItems.length).toBeGreaterThan(0);
  expect(previousItems).toEqual(againNextItems);
});
