import { test, expect } from "../fixtures/basePage";


test("Verify on login popup window that all required boxes are visible", async ({
  loginPage,
  homePage,
}) => {
  await homePage.goTo();
  await loginPage.goTo();
  await expect.soft(loginPage.usernameInput).toBeVisible();
  await expect.soft(loginPage.passwordInput).toBeVisible();
  await expect.soft(loginPage.loginButton).toBeVisible();
  await expect.soft(loginPage.closeButton).toBeVisible();
  await expect.soft(loginPage.loginHeading).toBeVisible();
  await expect.soft(loginPage.userNameLabel).toBeVisible();
  await expect(loginPage.passwordLabel).toBeVisible();
});
test("Verify that Login page is can be close correctly", async ({
  loginPage,
  homePage,
}) => {
  await homePage.goTo();
  await loginPage.goTo();
  await expect.soft(loginPage.loginHeading).toBeVisible();
  await loginPage.closeButton.click();
  await expect(loginPage.loginHeading).not.toBeVisible();
});
test("Verify that Login page is can be close correctly on X button", async ({
  loginPage,
  homePage,
}) => {
  await homePage.goTo();
  await loginPage.goTo();
  await expect.soft(loginPage.loginHeading).toBeVisible();
  await loginPage.closeXButton.click();
  await expect(loginPage.loginHeading).not.toBeVisible();
});

test("Verify Login with wrong creds any creds", async ({
  loginPage,
  homePage,
}) => {
  await loginPage.setupDialogHandler();
  await homePage.goTo();
  await loginPage.goTo();
  await loginPage.login("sdfada", "342424");
  expect(loginPage.getDialogMessage()).toEqual("User does not exist.");
});

test("Verify Login popup message when user login without any creds", async ({
  loginPage,
  homePage,
}) => {
  await loginPage.setupDialogHandler();
  await homePage.goTo();
  await loginPage.goTo();
  await loginPage.login("", "");
  expect(loginPage.getDialogMessage()).toEqual(
    "Please fill out Username and Password."
  );
});
test("Login process test with valid creds", async ({ loginPage, homePage }) => {
  await homePage.goTo();
  await loginPage.goTo();
  await loginPage.login("tihana", "123456");
  await loginPage.verifyLoginUser("tihana");
});
