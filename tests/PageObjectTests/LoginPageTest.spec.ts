import { test, expect} from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import {
  popuUpMessage,
} from "../../ReusableMethod/Methods";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationBar } from "../../pages/NavigationBar";
test("Verify on login popup window that all required boxes are visible", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
   await expect(loginPage.usernameInput).toBeVisible();
   await expect(loginPage.passwordInput).toBeVisible();
   await expect(loginPage.loginButton).toBeVisible();
   await expect(loginPage.closeButton).toBeVisible();
   await expect(loginPage.loginHeading).toBeVisible();
   await expect(loginPage.userNameLabel).toBeVisible();
   await expect(loginPage.passwordLabel).toBeVisible();
});
test("Verify that Login page is can be close correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await expect(loginPage.loginHeading).toBeVisible();
  await loginPage.closeButton.click();
  await expect(loginPage.loginHeading).not.toBeVisible();
});
test("Verify that Login page is can be close correctly on X button", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await expect(loginPage.loginHeading).toBeVisible();
  await loginPage.closeXButton.click();
  await expect(loginPage.loginHeading).not.toBeVisible();
});

test("Verify Login with wrong creds any creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await popuUpMessage(loginPage.page, "User does not exist.");
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await loginPage.login("sdfada", "342424");
});

test("Verify Login popup message when user login without any creds", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
 await homePage.goTo();
  await navigationBar.navigateToLogin();
  await popuUpMessage(loginPage.page, "Please fill out Username and Password.");
  await loginPage.login("", "");
});
test("Login process test with valid creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
});
