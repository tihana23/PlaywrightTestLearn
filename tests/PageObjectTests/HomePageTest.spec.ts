import { test, expect } from "../fixtures/basePage";
test("Verify that webpage has title", async ({ homePage }) => {
  await homePage.goTo();
  await homePage.verifyCurrentURL("https://www.demoblaze.com/");
  await homePage.verifyWebPageTitle("STORE");
});
test("Verify that homepage load test", async ({ homePage }) => {
  await homePage.goTo();
  await expect(homePage.homePageElement).toBeVisible();
});
test("Verify that next button on headline mobile pictures is working as expected", async ({
  homePage,
}) => {
  await homePage.goTo();

  await homePage.verifyNextButton();
});
test("Verify that Previous button on headline mobile pictures is working as expected", async ({
  homePage,
}) => {
  await homePage.goTo();
  await homePage.verifyPreviousButton();
});

test("Verify that categories text is displyed", async ({ homePage }) => {
  await homePage.goTo();
  await expect(homePage.categoriesHeadline).toBeVisible();
});

test("Verify that Phone Laptop Minitors categories are displayed", async ({
  homePage,
}) => {
  await homePage.goTo();
  await expect.soft(homePage.phonesCategory).toBeVisible();
  await expect.soft(homePage.laptopsCategory).toBeVisible();
  await expect(homePage.monitorsCategory).toBeVisible();
});

test("Verify that one from Home Page item can be clicked and visible on the Char page", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.productNokia.click();
  await productPage.addToCartButton.click();

  await cartPage.goTo();
  await expect(cartPage.cartNokia).toBeVisible({ timeout: 50000 });
});

test("Verify that one item from Home page and Phone categories is visible and can be selected", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.phonesCategory.click();
  await homePage.productSamsungS6.click();
  await expect.soft(productPage.productHeadingSamsungS6).toBeVisible();
  await expect.soft(productPage.productImage).toBeVisible();
  await expect.soft(productPage.productDescription).toBeVisible();
  await expect.soft(productPage.addToCartButton).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect(cartPage.cartSamsungS6).toBeVisible({ timeout: 50000 });
});
test("Verify that one item from home page and Laptops categories is visible and can be selected", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.laptopsCategory.click();
  await expect.soft(homePage.productMcBookAir).toBeEnabled;
  await homePage.productMcBookAir.click();
  await expect.soft(productPage.productHeadingMcBookAir).toBeVisible();
  await expect.soft(productPage.productImage).toBeVisible();
  await expect.soft(productPage.productDescription).toBeVisible();
  await expect.soft(productPage.addToCartButton).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect(cartPage.cartMcBookAir).toBeVisible({ timeout: 50000 });
});
test("Verify that one item from home page and Monitors categories is visible and can be selected", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.monitorsCategory.click();
  await expect.soft(homePage.productAppleMonitor).toBeEnabled;
   await homePage.productAppleMonitor.click();
  await expect.soft(productPage.productHeadingAppleMonitor).toBeVisible();
  await expect.soft(productPage.productImage).toBeVisible();
  await expect.soft(productPage.productDescription).toBeVisible();
  await expect.soft(productPage.addToCartButton).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect(cartPage.cartAppleMonitor).toBeVisible({ timeout: 50000 });
});

test("Verify that Categories gird is working as excepted on Next and previous button", async ({
  homePage,
}) => {
  await homePage.goTo();

  await expect.soft(homePage.productSamsungS6).toBeVisible();
  let firstPageItems = await homePage.getProductTitles();

  await homePage.nextButton1.click();
  await expect.soft(homePage.productAppleMonitor).toBeVisible();
  let nextItems = await homePage.getProductTitles();
  expect(nextItems.length).toBeGreaterThan(0);
  expect(nextItems).not.toEqual(firstPageItems);

  await homePage.previousButton1.click();
  await expect.soft(homePage.productSamsungS7).toBeVisible();
  let previousItems = await homePage.getProductTitles();
  expect(previousItems).not.toEqual(nextItems);

  await homePage.nextButton1.click();
  await expect.soft(homePage.productAppleMonitor).toBeVisible();
  let againNextItems = await homePage.getProductTitles();
  await expect.soft(nextItems.length).toBeGreaterThan(0);
  await expect(previousItems).toEqual(againNextItems);
});
