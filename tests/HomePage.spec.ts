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
  await page.goto("https://www.demoblaze.com/");
  await expect(page).toHaveTitle("STORE");
});

test("Verify that homepage load test", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");

  const homePageElement = page.getByText("Home");

  await expect(homePageElement).toBeVisible();
});

test("Verify that contact page is open correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });

  contactsLink.click();
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
  await page.goto("https://www.demoblaze.com/");
  const aboutUsLink = page.locator("a.nav-link", { hasText: "About us" });
  aboutUsLink.click();
  const closeButton = page.locator(
    "#videoModal .modal-footer >> button.btn.btn-secondary",
    { hasText: "Close" }
  );
  await expect(closeButton).toBeVisible();
});

test("Verify that Chart page is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
});

test("Verify that Login popup is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const loginLink = page.locator("a.nav-link", { hasText: "Log in" });
  loginLink.click();
  const logInCloseButton = page.locator("#logInModal .close");
  await expect(logInCloseButton).toBeVisible();
});
test("Verify that Register popup is oppened correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const registerLink = page.locator("a.nav-link", { hasText: "Sign up" });
  registerLink.click();
  const registerCloseButton = page.locator("#signInModal .close");

  await expect(registerCloseButton).toBeVisible();
});

test("Verify that Logout button is woking correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  await page.click("a#login2");
  const username1 = "tihana";
  const password1 = "123456";
  await page.fill('input[id="loginusername"]', username1);
  await page.fill('input[id="loginpassword"]', password1);
  await page.click('button[onclick="logIn()"]');
  await expect(page.locator("a#nameofuser")).toContainText("Welcome tihana");
  await page.screenshot({ path: "loginWithTihana.png" });
  const logoutButton = page.locator("#logout2");
  logoutButton.click();
  await expect(logoutButton).toBeHidden();
  const loginLink = page.locator("a.nav-link", { hasText: "Log in" });
  await expect(loginLink).toBeVisible();
  await page.screenshot({ path: "LoginVisible.png" });
});

test("Verify that next button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
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
  await page.goto("https://www.demoblaze.com/");
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
  await page.goto("https://www.demoblaze.com/");

  const phonesCategory = page.locator("text=CATEGORIES");
  await expect(phonesCategory).toBeVisible();
});

test("Verify that Phone Laptop Minitors categories are displayed", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");

  const phonesCategory = page.locator("text=Phones");
  await expect(phonesCategory).toBeVisible();

  const laptopsCategory = page.locator("text=Laptops");
  await expect(laptopsCategory).toBeVisible();

  const monitorsCategory = page.locator("text=Monitors");
  await expect(monitorsCategory).toBeVisible();
});
test("Verify that all categ row text is displyed????kako ovo prikazati", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
});
test("Verify that one item can be clicked and visible on the other page", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  const phonesCategory = page.locator("text=Phones");
  await expect(phonesCategory).toBeVisible();
  phonesCategory.click();
  const samsungGalaxyS6Link = page.locator("a.hrefch", {
    hasText: "Samsung galaxy s6",
  });
  samsungGalaxyS6Link.click();
  const samsungGalaxyS6Header = page.locator("h2.name", {
    hasText: "Samsung galaxy s6",
  });
  const isProductTitlePresent = await page.locator("h2.name").textContent();
  console.log(`Product Title: ${isProductTitlePresent}`);
  await expect(samsungGalaxyS6Header).toBeVisible();
});
