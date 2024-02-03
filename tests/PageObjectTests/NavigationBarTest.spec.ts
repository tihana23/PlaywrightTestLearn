import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AboutUsPage } from "../../pages/AboutUsPage";
import { CartPage } from "../../pages/CartPage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { NavigationBar } from "../../pages/NavigationBar";

test("Verify  navigation bar is visible on Home page", async ({ page }) => {
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.verifyAllNavBarLinksAreVisible();
});
test("Verify  navigation bar is visible on Cart page", async ({ page }) => {
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await navigationBar.verifyAllNavBarLinksAreVisible();
});

test("Verify that About us can be oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const aboutUsPage = new AboutUsPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToAboutUs();
  await aboutUsPage.verifyThatAboutUsElementsAreVisible();
});

test("Verify that Chart page is oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToCart();
  await cartPage.verifyVisabilityAllElementsInCartPage();
});

test("Verify that Login popup is oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await expect(loginPage.loginHeading).toBeVisible();
});
test("Verify that Register popup is oppened correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  await registerPage.verifyThatAllElementsAreVisibleOnRegisterPage();
});

test("Verify that Logout button is woking correctly", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
  await navigationBar.navigateToLogOut();
});
