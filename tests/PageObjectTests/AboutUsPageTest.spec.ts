import { test, expect } from "../fixtures/basePage";

test("Verify that AboutUsPopup have all fields visible", async ({
  homePage,
  aboutUsPage,
}) => {
  await homePage.goTo();
  await aboutUsPage.goTo();
  await expect.soft(aboutUsPage.aboutUsWindow).toBeEnabled();
await expect.soft(aboutUsPage.aboutUsTitle).toBeVisible();
  await expect.soft(aboutUsPage.closeXButton).toBeVisible();
  await expect(aboutUsPage.closeButton).toBeVisible();
});

test("Verify that AboutUsPopup can be close on close button", async ({
  homePage,
  aboutUsPage,
}) => {
  await homePage.goTo();
  await aboutUsPage.goTo();
  await expect.soft(aboutUsPage.aboutUsWindow).toBeEnabled();
  await aboutUsPage.closeButton.click({ timeout: 30000 });
  await aboutUsPage.waitForTimeout(1000); 
  await expect(aboutUsPage.aboutUsWindow).not.toBeVisible({
    timeout: 30000,
  });
});
test("Verify that AboutUsPopup can be close on close X buton", async ({
  homePage,
  aboutUsPage,
}) => {
  await homePage.goTo();
  await aboutUsPage.goTo();
    await expect.soft(aboutUsPage.aboutUsWindow).toBeEnabled();
  await aboutUsPage.closeXButton.click();
 await expect(aboutUsPage.aboutUsWindow).not.toBeVisible({
   timeout: 30000,
 });
});
