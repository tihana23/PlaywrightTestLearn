import { test, expect } from "../fixtures/basePage";


test("Verify that Product page have all fields visible", async ({
  homePage,cartPage, productPage
}) => {

  await homePage.goTo();
  await homePage.monitorsCategory.click();
  await homePage.productAppleMonitor.click();
  await expect.soft(productPage.productHeadingAppleMonitor).toBeVisible();
  await expect.soft(productPage.productImage).toBeVisible();
  await expect.soft(productPage.productDescription).toBeVisible();
  await expect.soft(productPage.addToCartButton).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect(cartPage.cartAppleMonitor).toBeVisible({ timeout: 50000 });
});

test("Verify that Add to cart button is working and show popup message", async ({
   homePage,cartPage, productPage
}) => {
 
  await homePage.goTo();

  await homePage.monitorsCategory.click();

  await homePage.productAppleMonitor.click();
  await productPage.setupDialogHandler();
  await expect.soft(productPage.productHeadingAppleMonitor).toBeVisible();
  await expect.soft(productPage.productImage).toBeVisible();
  await expect.soft(productPage.productDescription).toBeVisible();
  await expect.soft(productPage.addToCartButton).toBeVisible();
  await productPage.addToCartButton.click();
  await productPage.waitForTimeout(500);
  expect(productPage.getDialogMessage()).toEqual(
    "Product added"
  )
});

