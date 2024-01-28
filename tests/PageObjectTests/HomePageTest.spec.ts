import { test, expect, Page, Browser, chromium } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { verifyNextAndPreviousButton } from "../../ReusableMethod/Methods";
import { ContactPage } from "../../pages/ContactPage";
import { AboutUsPage } from "../../pages/AboutUsPage";
import { CartPage } from "../../pages/CartPage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { ProductPage } from "../../pages/ProductPage";
test("Verify that webpage has title", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.verifyCurrentURL("https://www.demoblaze.com/");
  await homePage.verifyWebPageTitle("STORE");
});
test("Verify that homepage load test", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await expect(homePage.homePageElement).toBeVisible();
});
test("Verify that contact page is open correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  await homePage.goToHomePage();
  await homePage.navigateToContacts();
  await contactPage.verifyThatContactPageIsOpen();
});

test("Verify that About us can be oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const aboutUsPage = new AboutUsPage(page);
  await homePage.goToHomePage();
  await homePage.navigateToAboutUs();
  await aboutUsPage.verifyThatAboutUsTitleIsVisible();
});

test("Verify that Chart page is oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  await homePage.goToHomePage();
  await homePage.navigateToCart();
  await cartPage.verifyPageTitle();
});

test("Verify that Login popup is oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  await homePage.goToHomePage();
  await homePage.openLoginPopup();
  await loginPage.verifyAllElementsVisibility();
});
test("Verify that Register popup is oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  await homePage.goToHomePage();
  await homePage.openRegisterPopup();
  await registerPage.verifySignUpFormElementsAreVisible();
});

test("Verify that Logout button is woking correctly", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.openLoginPopup();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
  await homePage.logout();
});

test("Verify that next button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await homePage.goToHomePage();

  await homePage.verifyNextButton();
});
test("Verify that Previous button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.verifyPreviousButton();
});

test("Verify that categories text is displyed", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.verifyCategoriesHeadline();
});
///tu sam stala
test("Verify that Phone Laptop Minitors categories are displayed", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.navigateToPhonesCategory();
  await homePage.navigateToLaptopsCategory();
  await homePage.navigateToMonitorsCategory();
});

test("Verify that one from Home Page item can be clicked and visible on the Char page", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const productPage = new ProductPage(page);
  await homePage.goToHomePage();
  await homePage.selectProduct("Nokia lumia 1520");
  await productPage.addProductToCart();
  await homePage.navigateToCart();
  await cartPage.verifyProductInCart("Nokia lumia 1520");
});

test("Verify that one item from Home page and Phone categories is visible and can be selected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  await homePage.goToHomePage();
  await homePage.navigateToPhonesCategory();
  await homePage.selectProduct("Samsung galaxy s6");
  await productPage.verifyProductIsOpenAndAllFielsAreVisible(
    "Samsung galaxy s6"
  );
  await productPage.addProductToCart();
  await homePage.navigateToCart();
  await cartPage.verifyProductInCart("Samsung galaxy s6");
});
test("Verify that one item from home page and Laptops categories is visible and can be selected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goToHomePage();
  await homePage.navigateToLaptopsCategory();
  await homePage.selectProduct("MacBook air");
  await productPage.verifyProductIsOpenAndAllFielsAreVisible("MacBook air");
  await productPage.addProductToCart();
  await homePage.navigateToCart();
  await cartPage.verifyProductInCart("MacBook air");
});
test("Verify that one item from home page and Monitors categories is visible and can be selected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goToHomePage();
  await homePage.navigateToMonitorsCategory();
  await homePage.selectProduct("Apple monitor 24");
  await productPage.verifyProductIsOpenAndAllFielsAreVisible(
    "Apple monitor 24"
  );
  await productPage.addProductToCart();
  await homePage.navigateToCart();
  await cartPage.verifyProductInCart("Apple monitor 24");
});

test("Verify that Categories gird is working as excepted on Next and previous button", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goToHomePage();

  await homePage.waitForProduct("Samsung galaxy s6");
  let firstPageItems = await homePage.getProductTitles();

  await homePage.clickNextButton();
  await homePage.waitForProduct("Apple monitor 24");
  let nextItems = await homePage.getProductTitles();
  expect(nextItems.length).toBeGreaterThan(0);
  expect(nextItems).not.toEqual(firstPageItems);

  await homePage.clickPrevButton();
  await homePage.waitForProduct("Samsung galaxy s7");
  let previousItems = await homePage.getProductTitles();
  expect(previousItems).not.toEqual(nextItems);

  await homePage.clickNextButton();
  await homePage.waitForProduct("Apple monitor 24");
  let againNextItems = await homePage.getProductTitles();
  expect(nextItems.length).toBeGreaterThan(0);
  expect(previousItems).toEqual(againNextItems);
});
