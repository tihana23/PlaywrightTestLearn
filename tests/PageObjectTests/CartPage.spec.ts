
import { test, expect } from "../fixtures/basePage";

test("Verify page Title", async ({ homePage, cartPage }) => {
  await homePage.goTo();
  await cartPage.goTo();
  await expect(cartPage.pageTitleCart).toBeVisible();
});
test("Verify page Cart Url", async ({ homePage, cartPage }) => {
  await homePage.goTo();
  await cartPage.goTo();
  await expect(cartPage.currentPage).toHaveURL(
    "https://www.demoblaze.com/cart.html"
  );
});

test("Verify visability of all elements on Cart page", async ({
  homePage,
  cartPage,
}) => {
  await homePage.goTo();
  await cartPage.goTo();
  await expect.soft(cartPage.pageTitleCart).toBeVisible();
  await expect.soft(cartPage.pageTotalCart).toBeVisible();
  await expect.soft(cartPage.pageProductsGridPicture).toBeVisible();
  await expect.soft(cartPage.pageProductsGridTitle).toBeVisible();
  await expect.soft(cartPage.pageProducGridPrice).toBeVisible();
  await expect(cartPage.pageProducGridX).toBeVisible();
});

test("Verify visability of all elements on Cart Place order popup", async ({
  homePage,
  cartPage,
}) => {
  await homePage.goTo();
  await cartPage.goTo();
  await cartPage.placeOrderButtonCartPage.click();
  await expect.soft(cartPage.placeOrderPopupHeading).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupTotal).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupLabelName).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupTextboxName).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupLabelCountry).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupTextboxCountry).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupLabelCity).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupTextboxCity).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupLabelCreditCard).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupTextboxCreditCard).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupLabelMonth).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupTextboxMonth).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupLabelYear).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupTextboxYear).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupXCloseButton).toBeVisible();
  await expect.soft(cartPage.placeOrderPopupPurchaseButton).toBeVisible();
  await expect(cartPage.placeOrderPopupCloseButton).toBeVisible();
});

test("Verify Place order popup close button X is working", async ({
  homePage,
  cartPage,
}) => {
  await homePage.goTo();
  await cartPage.goTo();
  await cartPage.placeOrderButtonCartPage.click();
  await expect.soft(cartPage.placeOrderPopupHeading).toBeVisible();
  await cartPage.placeOrderPopupXCloseButton.click();
  await expect(cartPage.pageTitleCart).toBeVisible();
});
test("Verify Place order popup close button is working", async ({
  homePage,
  cartPage,
}) => {
  await homePage.goTo();
  await cartPage.goTo();
  await cartPage.placeOrderButtonCartPage.click();
  await expect.soft(cartPage.placeOrderPopupHeading).toBeVisible();
  await cartPage.placeOrderPopupCloseButton.click();
  await expect(cartPage.pageTitleCart).toBeVisible();
});

test("Verify Place order popup message if data is not populated", async ({
  homePage,
  cartPage,
  
}) => {
  await homePage.goTo();
  await cartPage.goTo();
  await cartPage.setupDialogHandler();
  await cartPage.placeOrderButtonCartPage.click();
  await cartPage.placeOrderPopupPurchaseButton.click();
  expect(cartPage.getDialogMessage()).toEqual("Please fill out Name and Creditcard.");
});

test("Verify that one item from home page can be selected and visible on the char page", async ({
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
test("Verify that one item from home page can be selected and visible on the char page and be deleted", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.productSamsungS6.click();
  await expect.soft(productPage.productHeadingSamsungS6).toBeVisible();
  await expect.soft(productPage.productImage).toBeVisible();
  await expect.soft(productPage.productDescription).toBeVisible();
  await expect.soft(productPage.addToCartButton).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartSamsungS6).toBeVisible({ timeout: 50000 });
  await cartPage.deleteButton.click();
  await expect(cartPage.cartSamsungS6).toBeHidden();
});
test("Verify that one item from home page Phones can be selected and visible on the char page and be deleted", async ({
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
  await expect.soft(cartPage.cartSamsungS6).toBeVisible({ timeout: 50000 });
  await cartPage.deleteButton.click();
  await expect(cartPage.cartSamsungS6).toBeHidden();
});

test("Verify that one item from home page Laptops can be selected and visible on the char page and be deleted", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.laptopsCategory.click();
  await homePage.productMcBookAir.click();
  await expect.soft(productPage.productHeadingMcBookAir).toBeVisible();
  await expect.soft(productPage.productImage).toBeVisible();
  await expect.soft(productPage.productDescription).toBeVisible();
  await expect.soft(productPage.addToCartButton).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartMcBookAir).toBeVisible({ timeout: 50000 });
  await cartPage.deleteButton.click();
  await expect(cartPage.cartMcBookAir).toBeHidden();
});
test("Verify that one item from home page Monitors can be selected and visible on the char page and be deleted", async ({
  homePage,
  cartPage,
  productPage,
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
  await expect.soft(cartPage.cartAppleMonitor).toBeVisible({ timeout: 50000 });
  await cartPage.deleteButton.click();
  await expect(cartPage.cartAppleMonitor).toBeHidden();
});
test("Verify that total in cart can be calculated", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.productSamsungS6.click();
  await expect.soft(productPage.productHeadingSamsungS6).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartSamsungS6).toBeVisible();
  await homePage.goTo();
  await homePage.productNokia.click();
  await expect.soft(productPage.productHeadingNokia).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartNokia).toBeVisible();
  const priceSamsung = await cartPage.getPriceFromCart(
    cartPage.productRowCartSamsung
  );
  const priceNokia = await cartPage.getPriceFromCart(
    cartPage.productRowCartNokia
  );
  const expectedTotal = priceSamsung + priceNokia;
  await cartPage.verifyTotalAmount(expectedTotal);
  await cartPage.placeOrderWithRandomData(expectedTotal);
});
test("Verify that Place order can be populated and valid data and total is shown on popup ", async ({
  homePage,
  cartPage,
  productPage,
}) => {
  await homePage.goTo();
  await homePage.productSamsungS6.click();
  await expect.soft(productPage.productHeadingSamsungS6).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartSamsungS6).toBeVisible();
  await homePage.goTo();
  await homePage.productNokia.click();
  await expect.soft(productPage.productHeadingNokia).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartNokia).toBeVisible();
  const priceSamsung = await cartPage.getPriceFromCart(
    cartPage.productRowCartSamsung
  );
  const priceNokia = await cartPage.getPriceFromCart(
    cartPage.productRowCartNokia
  );
  const expectedTotal = priceSamsung + priceNokia;
  await cartPage.verifyTotalAmount(expectedTotal);
  await cartPage.placeOrderWithRandomData(expectedTotal);
});

test("Verify that Login user with added product to a cart after logout than login that products are visible in cart", async ({
  homePage,
  cartPage,
  productPage,
  loginPage,
}) => {
  await homePage.goTo();
  await loginPage.goTo();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
  await homePage.goTo();
  await homePage.productSamsungS6.click();
  await expect.soft(productPage.productHeadingSamsungS6).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartSamsungS6).toBeVisible();
  await homePage.goTo();
  await homePage.productNokia.click();
  await expect.soft(productPage.productHeadingNokia).toBeVisible();
  await productPage.addToCartButton.click();
  await cartPage.goTo();
  await expect.soft(cartPage.cartNokia).toBeVisible();
  await cartPage.goTo();
  await loginPage.goToLogout();
  await loginPage.goTo();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
  await cartPage.goTo();
  await cartPage.goTo();
  await expect.soft(cartPage.cartSamsungS6).toBeVisible();
  await expect(cartPage.cartNokia).toBeVisible();
});
