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

test("Verify that one item from home page can be selected and visible on the char page", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
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
  await page.waitForTimeout(2000);
  await page.getByText("Add to cart").waitFor();
  const linkAddCart8 = page.getByText("Add to cart");
  await linkAddCart8.click({ force: true });
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  const tdSamsungGalaxy = page.getByText("Samsung galaxy s6");
  await expect(tdSamsungGalaxy).toBeVisible();
});
test("Verify that one item from home page can be selected and visible on the char page and deleted", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
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
  await page.waitForTimeout(2000);
  await page.getByText("Add to cart").waitFor();
  const linkAddCart8 = page.getByText("Add to cart");
  await linkAddCart8.click({ force: true });
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  const tdSamsungGalaxy = page.getByText("Samsung galaxy s6");
  await expect(tdSamsungGalaxy).toBeVisible();
  const linkDelete = page.getByText("Delete");
  await expect(linkDelete).toBeVisible();
  await linkDelete.click();
  await page.waitForTimeout(2000);
  await page.waitForTimeout(2000);
  await expect(tdSamsungGalaxy).toBeHidden();
});

test("Verify that one item from home page and Phone categories can be selected and visible on the char page and deleted", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
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
  await page.waitForTimeout(2000);
  await page.getByText("Add to cart").waitFor();
  const linkAddCart8 = page.getByText("Add to cart");
  await linkAddCart8.click({ force: true });
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  const tdSamsungGalaxy = page.getByText("Samsung galaxy s6");
  await expect(tdSamsungGalaxy).toBeVisible();
  const linkDelete = page.getByText("Delete");
  await expect(linkDelete).toBeVisible();
  await linkDelete.click();
  await page.waitForTimeout(2000);
  await page.waitForTimeout(2000);
  await expect(tdSamsungGalaxy).toBeHidden();
});
test("Verify that one item from home page and Laptops categories can be selected and visible on the char page and deleted", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");

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
  await page.waitForTimeout(2000);
  await page.getByText("Add to cart").waitFor();
  const linkAddCart8 = page.getByText("Add to cart");
  await linkAddCart8.click({ force: true });
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  const laptopChar = page.getByText("Sony vaio i5");
  await expect(laptopChar).toBeVisible();
  const linkDelete = page.getByText("Delete");
  await expect(linkDelete).toBeVisible();
  await linkDelete.click();
  await page.waitForTimeout(2000);
  await page.waitForTimeout(2000);
  await expect(laptopChar).toBeHidden();
});
test("Verify that one item from home page and Monitors categories can be selected and visible on the char page and deleted", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");

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
  await page.waitForTimeout(2000);
  await page.getByText("Add to cart").waitFor();
  const linkAddCart8 = page.getByText("Add to cart");
  await linkAddCart8.click({ force: true });
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  const monitorChar = page.getByText("Apple monitor 24");
  await expect(monitorChar).toBeVisible();
  const linkDelete = page.getByText("Delete");
  await expect(linkDelete).toBeVisible();
  await linkDelete.click();
  await page.waitForTimeout(2000);
  await page.waitForTimeout(2000);
  await expect(monitorChar).toBeHidden();
});
test("Verify that cart Total is calculated correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");

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
  await page.waitForTimeout(2000);
  await page.getByText("Add to cart").waitFor();
  const linkAddCart8 = page.getByText("Add to cart");
  await linkAddCart8.click({ force: true });
  const cartLink = page.locator("a.nav-link", { hasText: "Cart" });
  await cartLink.click();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
  const monitorChar = page.getByText("Apple monitor 24");
  await expect(monitorChar).toBeVisible();
  const linkDelete = page.getByText("Delete");
  await expect(linkDelete).toBeVisible();
  await linkDelete.click();
  await page.waitForTimeout(2000);
  await page.waitForTimeout(2000);
  await expect(monitorChar).toBeHidden();
});
test("Verify total in cart is calculated correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  const addProductToCart = async (productName: string) => {
    await page.click(`.card-title a:has-text("${productName}")`);
    const linkAddCart8 = page.getByText("Add to cart");
    await linkAddCart8.click({ force: true });
    await page.waitForTimeout(1000);
    const locator = page.locator("a.navbar-brand#nava");

    await locator.click();
  };
  await addProductToCart("Samsung galaxy s6");

  await addProductToCart("Nokia lumia 1520");

  await page.click("#cartur");

  const getPriceFromCart = async (productName: string) => {
    const productRow = page.locator(`tr.success:has-text("${productName}")`);

    const priceText = await productRow.locator("td:nth-child(3)").textContent();
    if (priceText !== null) {
      return parseFloat(priceText);
    } else {
      console.error(`Price not found for ${productName}`);
      return 0;
    }
  };
  await page.waitForTimeout(1000);
  const priceSamsung = await getPriceFromCart("Samsung galaxy s6");
  const priceNokia = await getPriceFromCart("Nokia lumia 1520");
  const expectedTotal = priceSamsung + priceNokia;
  const totalText = await page.textContent("#totalp");
  const actualTotal = totalText ? parseFloat(totalText) : 0;
  console.log(`Expected Total: ${expectedTotal}, Actual Total: ${actualTotal}`);
  expect(expectedTotal).toBe(actualTotal);
});
