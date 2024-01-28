import { test, expect } from "@playwright/test";
import { popuUpMessage } from "../../ReusableMethod/Methods";
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";

test("Verify on login popup window that all required boxes are visible", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.openLoginPopup();
  await loginPage.verifyAllElementsVisibility();
});

test("Verify Login without any creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.openLoginPopup();
  await loginPage.verifyPopupLoginMessageNonCredentials();
  await loginPage.login("", "");
});

test("Verify Login with wrong creds any creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.verifyPopupLoginMessageWrongCredentials();
  await homePage.goToHomePage();
  await homePage.openLoginPopup();
  await loginPage.login("sdfada", "342424");
});
test("Login process test with valid creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await homePage.goToHomePage();
  await homePage.openLoginPopup();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
});
