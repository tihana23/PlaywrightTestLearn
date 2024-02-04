import { test, expect, Page, Browser, chromium } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { CartPage } from "../../pages/CartPage";
import { ProductPage } from "../../pages/ProductPage";
import { NavigationBar } from "../../pages/NavigationBar";
test("Verify that webpage has title", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goTo();
  await homePage.verifyCurrentURL("https://www.demoblaze.com/");
  await homePage.verifyWebPageTitle("STORE");
});
test("Verify that homepage load test", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goTo();
  await expect(homePage.homePageElement).toBeVisible();
});
test("Verify that next button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goTo();

  await homePage.verifyNextButton();
});
test("Verify that Previous button on headline mobile pictures is working as expected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goTo();
  await homePage.verifyPreviousButton();
});

test("Verify that categories text is displyed", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goTo();
  await expect(homePage.categoriesHeadline).toBeVisible();
});

test("Verify that Phone Laptop Minitors categories are displayed", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  const homePage = new HomePage(page);
  await homePage.goTo();
  await homePage.navigateToPhonesCategory();
  await homePage.navigateToLaptopsCategory();
  await homePage.navigateToMonitorsCategory();
});

test("Verify that one from Home Page item can be clicked and visible on the Char page", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const productPage = new ProductPage(page,"Nokia lumia 1520");
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await homePage.selectProduct("Nokia lumia 1520");
  await productPage.addProductToCart();
  await navigationBar.navigateToCart();
  await cartPage.verifyProductInCart("Nokia lumia 1520");
});

test("Verify that one item from Home page and Phone categories is visible and can be selected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page, "Samsung galaxy s6");
  const cartPage = new CartPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await homePage.navigateToPhonesCategory();
  await homePage.selectProduct("Samsung galaxy s6");
  await productPage.verifyProductIsOpenAndAllFieldsAreVisible();
  await productPage.addProductToCart();
  await navigationBar.navigateToCart();
  await cartPage.verifyProductInCart("Samsung galaxy s6");
});
test("Verify that one item from home page and Laptops categories is visible and can be selected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page, "MacBook air");
  const cartPage = new CartPage(page);
  const navigationBar = new NavigationBar(page);

  await homePage.goTo();
  await homePage.navigateToLaptopsCategory();
  await homePage.selectProduct("MacBook air");
  await productPage.verifyProductIsOpenAndAllFieldsAreVisible();
  await productPage.addProductToCart();
  await navigationBar.navigateToCart();
  await cartPage.verifyProductInCart("MacBook air");
});
test("Verify that one item from home page and Monitors categories is visible and can be selected", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page, "Apple monitor 24");
  const cartPage = new CartPage(page);
  const navigationBar = new NavigationBar(page);

  await homePage.goTo();
  await homePage.navigateToMonitorsCategory();
  await homePage.selectProduct("Apple monitor 24");
  await productPage.verifyProductIsOpenAndAllFieldsAreVisible();
  await productPage.addProductToCart();
  await navigationBar.navigateToCart();
  await cartPage.verifyProductInCart("Apple monitor 24");
});

test("Verify that Categories gird is working as excepted on Next and previous button", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goTo();

  await homePage.waitForProduct("Samsung galaxy s6");
  let firstPageItems = await homePage.getProductTitles();

  await homePage.nextButton1.click();
  await homePage.waitForProduct("Apple monitor 24");
  let nextItems = await homePage.getProductTitles();
  expect(nextItems.length).toBeGreaterThan(0);
  expect(nextItems).not.toEqual(firstPageItems);

  await homePage.previousButton1.click();
  await homePage.waitForProduct("Samsung galaxy s7");
  let previousItems = await homePage.getProductTitles();
  expect(previousItems).not.toEqual(nextItems);

  await homePage.nextButton1.click();
  await homePage.waitForProduct("Apple monitor 24");
  let againNextItems = await homePage.getProductTitles();
  expect(nextItems.length).toBeGreaterThan(0);
  expect(previousItems).toEqual(againNextItems);
});
