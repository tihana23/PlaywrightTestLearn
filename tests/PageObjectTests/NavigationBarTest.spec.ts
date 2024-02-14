import { test, expect } from "../fixtures/basePage";
test("Verify  navigation bar is visible on Home page", async ({
  navigationBarPage,
 homePage}) => {

  await homePage.goTo();
  await expect.soft(navigationBarPage.homeLink).toBeVisible();
  await expect.soft(navigationBarPage.contactsLink).toBeVisible();
  await expect.soft(navigationBarPage.aboutUsLink).toBeVisible();
  await expect.soft(navigationBarPage.cartLink).toBeVisible();
  await expect(navigationBarPage.loginLink).toBeVisible();
});
test("Verify  navigation bar is visible on Cart page", async ({   navigationBarPage,
 homePage, cartPage }) => {

  await homePage.goTo();
  await cartPage.goTo();
  await expect.soft(navigationBarPage.homeLink).toBeVisible();
  await expect.soft(navigationBarPage.contactsLink).toBeVisible();
  await expect.soft(navigationBarPage.aboutUsLink).toBeVisible();
  await expect.soft(navigationBarPage.cartLink).toBeVisible();
  await expect(navigationBarPage.loginLink).toBeVisible();
});
