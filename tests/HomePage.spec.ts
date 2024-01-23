import { faker } from "@faker-js/faker";
import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
  Dialog,
} from "@playwright/test";
const username = faker.person.firstName();
const password = faker.person.lastName();

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
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });

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
  const aboutUsLink = page.locator("a.nav-link", { hasText: "About us" });
  aboutUsLink.click();
  const closeButton = page.locator(
    "#videoModal .modal-footer >> button.btn.btn-secondary",
    { hasText: "Close" }
  );
  await expect(closeButton).toBeVisible();
});

test("Verify that Chart page is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
});

test("Verify that Login popup is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const loginLink = page.locator("a.nav-link", { hasText: "Log in" });
  loginLink.click();
  const logInCloseButton = page.locator("#logInModal .close");
  await expect(logInCloseButton).toBeVisible();
});
test("Verify that Register popup is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const registerLink = page.locator("a.nav-link", { hasText: "Sign up" });
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
  await page.screenshot({ path: "loginWithTihana.png" });
  const logoutButton = page.locator("#logout2");
  await logoutButton.click();
  await expect(logoutButton).toBeHidden();
  const loginLink = page.locator("a.nav-link", { hasText: "Log in" });
  await expect(loginLink).toBeVisible();
  await page.screenshot({ path: "LoginVisible.png" });
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
  for (const { src, alt } of expectedSlides) {
    //currently active slide
    const activeImageSelector =
      "div.carousel-item.active img.d-block.img-fluid";
    //expected source and alt text
    const image = page.locator(activeImageSelector);
    await expect(image).toHaveAttribute("src", src);
    await expect(image).toHaveAttribute("alt", alt);
    console.log(src);
    console.log(alt);
    // Move to the next slide
    nextButtonSelector.click();
    await page.waitForTimeout(1000);
  }
});
test("Verify that back button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const nextButtonSelector = page.locator("span.sr-only", {
    hasText: "Previous",
  });

  const expectedSlides = [
    { src: "Samsung1.jpg", alt: "First slide" },
    { src: "iphone1.jpg", alt: "Third slide" },
    { src: "nexus1.jpg", alt: "Second slide" },
  ];
  for (const { src, alt } of expectedSlides) {
    //currently active slide
    const activeImageSelector =
      "div.carousel-item.active img.d-block.img-fluid";
    //expected source and alt text
    const image = page.locator(activeImageSelector);
    await expect(image).toHaveAttribute("src", src);
    await expect(image).toHaveAttribute("alt", alt);
    console.log(src);
    console.log(alt);
    // Move to the next slide
    nextButtonSelector.click();
    await page.waitForTimeout(1000);
  }
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
  const isProductTitlePresent = await page.locator("h2.name").textContent();
  console.log(`Product Title: ${isProductTitlePresent}`);
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
  console.log(`Product Title: ${isProductTitlePresent}`);
  await expect(samsungGalaxyS6Header).toBeVisible();
});
test("Verify that one item from home page and Laptops categories is visible and can be selected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const categoryLaptops = page.locator("text=Laptops");
  await expect(categoryLaptops).toBeVisible();
  await page.waitForTimeout(5000);
  await categoryLaptops.click();
  await page.waitForTimeout(5000);
  const laptopLink = page.locator("a.hrefch", {
    hasText: "Sony vaio i5",
  });
  await laptopLink.click();
  const laptopHeader = page.locator("h2.name", {
    hasText: "Sony vaio i5",
  });
  const isProductTitlePresent = await page.locator("h2.name").textContent();
  console.log(`Product Title: ${isProductTitlePresent}`);
  await expect(laptopHeader).toBeVisible();
});
test("Verify that one item from home page and Monitors categories is visible and can be selected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const categoryMonitors = page.locator("text=Monitors");
  await expect(categoryMonitors).toBeVisible();
  await page.waitForTimeout(5000);
  await categoryMonitors.click();
  await page.waitForTimeout(5000);
  const monitorLink = page.locator("a.hrefch", {
    hasText: "Apple monitor 24",
  });
  await monitorLink.click();
  const monitorHeader = page.locator("h2.name", {
    hasText: "Apple monitor 24",
  });
  const isProductTitlePresent = await page.locator("h2.name").textContent();
  console.log(`Product Title: ${isProductTitlePresent}`);
  await expect(monitorHeader).toBeVisible();
});

test("Verify that Categories gird is working as excepted on Next and previous button", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  //await page.waitForTimeout(4000);
  //svi popis svih itema
  let firstPageItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );
  console.log("First page items:", firstPageItems);
  await page.waitForTimeout(3000);
  await page.click('button[id="next2"]');
  await page.waitForTimeout(3000);
  let nextItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );
  console.log("Next Page Items:", nextItems);
  expect(nextItems.length).toBeGreaterThan(0);
  expect(nextItems).not.toEqual(firstPageItems);
  await page.click('button[id="prev2"]');
  await page.waitForTimeout(3000);
  let previousItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );
  console.log("Previous Page Items:", previousItems);
  expect(previousItems).not.toEqual(nextItems);
  await page.waitForTimeout(3000);
  await page.click('button[id="next2"]');
  let againNextItems = await page.$$eval(".card-title a", (elements) =>
    elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
  );
  await page.waitForTimeout(3000);
  console.log("Again Next Page Items:", againNextItems);
  expect(nextItems.length).toBeGreaterThan(0);
  expect(previousItems).toEqual(againNextItems);
});
