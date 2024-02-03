import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import {

  addProductToCart,
  getPriceFromCart,
} from "../../ReusableMethod/Methods";

import { CartPage } from "../../pages/CartPage";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationBar } from "../../pages/NavigationBar";

test("Verify page Title", async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await expect(cartPage.pageTitleCart).toBeVisible();
});
test("Verify page Cart Url", async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await expect(page).toHaveURL("https://www.demoblaze.com/cart.html");
});

test("Verify visability of all elements on Cart page", async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await cartPage.verifyVisabilityAllElementsInCartPage();
});

test("Verify visability of all elements on Cart Place order popup", async ({
  page,
}) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await cartPage.placeOrderButtonCartPage.click();
  await cartPage.verifyVisabilityAllElementsOnPopupPlaceOrderPage();
});

test("Verify Place order popup close button X is working", async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await cartPage.placeOrderButtonCartPage.click();
  expect(cartPage.placeOrderPopupHeading).toBeVisible();
  await cartPage.placeOrderPopupXCloseButton.click();
  //nije dobro fali mi provjera
});
test("Verify Place order popup close button is working", async ({page}) => {

  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await cartPage.placeOrderButtonCartPage.click();
  expect(cartPage.placeOrderPopupHeading).toBeVisible();
  await cartPage.placeOrderPopupCloseButton.click();
  //nije dobro fali mi provjera
});

test("Verify Place order popup message if data is not populated", async ({
  page,
}) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await cartPage.verifyDialogPopupLoginMessageWrongCredentials();
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await cartPage.placeOrderButtonCartPage.click();
  await cartPage.placeOrderPopupPurchaseButton.click();
});

test("Verify that one item from home page can be selected and visible on the char page", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.selectOneItemFromPageAndAddItToCart("Samsung galaxy s6");
});
test("Verify that one item from home page can be selected and visible on the char page and be deleted", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  await homePage.goTo();
  await homePage.selectOneItemFromPageAndAddItToCart("Samsung galaxy s6");
  await cartPage.removeProductFromCart("Samsung galaxy s6");
});
test("Verify that one item from home page Phones can be selected and visible on the char page and be deleted", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  await homePage.goTo();
  await homePage.navigateToPhonesCategory();
  await homePage.selectOneItemFromPageAndAddItToCart("Samsung galaxy s6");
  await cartPage.removeProductFromCart("Samsung galaxy s6");
});

test("Verify that one item from home page Laptops can be selected and visible on the char page and be deleted", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  await homePage.goTo();
  await homePage.navigateToLaptopsCategory();
  await homePage.selectOneItemFromCategoriesAndAddItToCart("Sony vaio i5");
  await cartPage.removeProductFromCart("Sony vaio i5");
});
test("Verify that one item from home page Monitors can be selected and visible on the char page and be deleted", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  await homePage.goTo();
  await homePage.navigateToMonitorsCategory();
  await homePage.selectOneItemFromCategoriesAndAddItToCart("Apple monitor 24");
  await cartPage.removeProductFromCart("Apple monitor 24");
});
test("Verify that total in cart can be calculated", async ({ page }) => {
  await page.waitForLoadState("networkidle");
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await addProductToCart(page, "Samsung galaxy s6");
  await addProductToCart(page, "Nokia lumia 1520");
  await navigationBar.navigateToCart();
  const priceSamsung = await getPriceFromCart(page, "Samsung galaxy s6");
  const priceNokia = await getPriceFromCart(page, "Nokia lumia 1520");
  const expectedTotal = priceSamsung + priceNokia;
  await cartPage.verifyTotalAmount(expectedTotal);
  await cartPage.placeOrderWithRandomData(expectedTotal);
});
test("Verify that Place order can be populated and valid data and total is shown on popup ", async ({page}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await addProductToCart(page, "Samsung galaxy s6");
  await addProductToCart(page, "Nokia lumia 1520");
  await navigationBar.navigateToCart();
  const priceSamsung = await getPriceFromCart(page, "Samsung galaxy s6");
  const priceNokia = await getPriceFromCart(page, "Nokia lumia 1520");
  const expectedTotal = priceSamsung + priceNokia;
  await cartPage.verifyTotalAmount(expectedTotal);
  await cartPage.placeOrderWithRandomData(expectedTotal);
});

test("Verify that Login user with added product to a cart after logout than login that products are visible in cart", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
  await addProductToCart(page, "Samsung galaxy s6");
  await addProductToCart(page, "Nokia lumia 1520");
  await navigationBar.navigateToCart();
  await navigationBar.logoutLink.click();
  await navigationBar.navigateToLogin();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
  await navigationBar.navigateToCart();
  await cartPage.verifyIsthereAnyProductInCart("Samsung galaxy s6");
  await cartPage.verifyIsthereAnyProductInCart("Nokia lumia 1520");
});
