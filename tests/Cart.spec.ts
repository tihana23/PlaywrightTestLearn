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
//!ne mogu kliknut na gumb
test("Verify that one item can be clicked and visible on the other page????ne mogu kliknut na gumb", async ({
  page,
}) => {
  page.on("dialog", async (dialog) => {
    const text = dialog.message();
    console.log(text);
    expect(dialog.message()).toBe("Product added.");
    await dialog.accept();
  });
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
  await page.waitForTimeout(2000);
  const addToCartButton = page.locator('[onclick="addToCart(1)"]');
  addToCartButton.click();
});
