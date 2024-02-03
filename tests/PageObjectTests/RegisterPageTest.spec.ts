import { test, expect} from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import {
  popuUpMessage
} from "../../ReusableMethod/Methods";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { faker } from "@faker-js/faker";
import { NavigationBar } from "../../pages/NavigationBar";
test("Verify on Register popup window that all required boxes are visible", async ({
  page,
}) => {
  const registerPage = new RegisterPage(page);
  const homePage = new HomePage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  await registerPage.verifyThatAllElementsAreVisibleOnRegisterPage();
});
test("Verify that Register page can be close correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  await expect(registerPage.registerHeading).toBeVisible();
  await registerPage.closeButton.click();
  await expect(registerPage.registerHeading).not.toBeVisible();
});
test("Verify that Register page is can be close correctly on x button", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  await expect(registerPage.registerHeading).toBeVisible();
  await registerPage.closeXButton.click();
  await expect(registerPage.registerHeading).not.toBeVisible();
});
test("Verify that register process with empty credentials shown popup error", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  await popuUpMessage(page, "Please fill out Username and Password.");
  await registerPage.fillSignUpForm("", "");
  await registerPage.signUpButton.click();
});
test("Verify that register process with existing credentials shown popup error", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  await popuUpMessage(page, "This user already exist.");
  await registerPage.fillSignUpForm("tihana", "123456");

  await registerPage.signUpButton.click();
  await registerPage.page.waitForTimeout(1000); //without this popup will not be shown
});

test("Verify register process with new credentials and sucessful popup is shown", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  const userName = faker.person.firstName() + "mmuuu";
  const password = faker.person.firstName() + "123";
  await registerPage.registerNewUser(userName, password);
});
test("Verify that user can be register and login", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToSignUp();
  const userName = faker.person.firstName() + "mmuuu";
  const password = faker.person.firstName() + "123";
  await registerPage.registerNewUser(userName, password);
  await homePage.goTo();
  await navigationBar.navigateToLogin();
  await loginPage.login(userName, password);
  await loginPage.verifyLoginUser(userName);
});
