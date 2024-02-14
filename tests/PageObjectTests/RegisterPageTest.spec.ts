import { test, expect } from "../fixtures/basePage";

import { faker } from "@faker-js/faker";
test("Verify on Register popup window that all required boxes are visible", async ({
  registerPage,homePage
}) => {

await homePage.goTo();
await registerPage.goTo();
await expect.soft(registerPage.usernameInput).toBeVisible();
await expect.soft(registerPage.passwordInput).toBeVisible();
await expect.soft(registerPage.signUpButton).toBeVisible();
await expect.soft(registerPage.closeButton).toBeVisible();
await expect.soft(registerPage.registerHeading).toBeVisible();
await expect.soft(registerPage.userNameLabel).toBeVisible();
await expect.soft(registerPage.passwordLabel).toBeVisible();
await expect(registerPage.closeXButton).toBeVisible();
});
test("Verify that Register page can be close correctly", async ({
  registerPage,
  homePage,
}) => {


  await homePage.goTo();
  await registerPage.goTo();
  await expect.soft(registerPage.registerHeading).toBeVisible();
  await registerPage.closeButton.click();
  await expect(registerPage.registerHeading).not.toBeVisible();
});
test("Verify that Register page is can be close correctly on x button", async ({
  registerPage,
  homePage,
}) => {


  await homePage.goTo();
  await registerPage.goTo();
  await expect.soft(registerPage.registerHeading).toBeVisible();
  await registerPage.closeXButton.click();
  await expect(registerPage.registerHeading).not.toBeVisible();
});
test("Verify that register process with empty credentials shown popup error", async ({
  registerPage,
  homePage,
}) => {


  await homePage.goTo();
  await registerPage.goTo();
  await registerPage.setupDialogHandler();
  await registerPage.fillSignUpForm("", "");
  await registerPage.signUpButton.click();
  expect(registerPage.getDialogMessage()).toEqual(
    "Please fill out Username and Password."
  );
});
test("Verify that register process with existing credentials shown popup error", async ({
  registerPage,
  homePage,
}) => {
  await homePage.goTo();
  await registerPage.goTo();
  await registerPage.setupDialogHandler();
  await registerPage.fillSignUpForm("tihana", "123456");
  await registerPage.signUpButton.click();
  await registerPage.waitForTimeout(500); //without this popup will not be shown
  expect(registerPage.getDialogMessage()).toEqual("This user already exist.");
});

test ("Verify register process with new credentials and sucessful popup is shown", async ({
  registerPage,
  homePage,
}) => {
  await homePage.goTo();
  await registerPage.goTo();
  await registerPage.setupDialogHandler();
  const userName = faker.person.firstName() + "mmuuu";
  const password = faker.person.firstName() + "123";
  await registerPage.fillSignUpForm(userName, password);
  await registerPage.signUpButton.click();
  await registerPage.waitForTimeout(500); //without this popup will not be shown
  expect(registerPage.getDialogMessage()).toEqual("Sign up successful.");
});
test("Verify that user can be register and login", async ({
  registerPage,
  homePage,loginPage
}) => {
  await homePage.goTo();
  await registerPage.goTo();
  const userName = faker.person.firstName() + "mmuuu";
  const password = faker.person.firstName() + "123";
  await registerPage.fillSignUpForm(userName, password);
  await registerPage.signUpButton.click();
  await homePage.goToHomeNav();
  await loginPage.goTo();
   await loginPage.usernameInput.fill(userName);
   await loginPage.passwordInput.fill(password);
   await loginPage.loginButton.click();
  await loginPage.verifyLoginUser(userName);
});
