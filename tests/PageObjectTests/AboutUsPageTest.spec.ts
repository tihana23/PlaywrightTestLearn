import { test, expect} from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { AboutUsPage } from "../../pages/AboutUsPage";
import { NavigationBar } from "../../pages/NavigationBar";
test("Verify that AboutUsPopup have all fields visible", async ({ page }) => {
  const homePage = new HomePage(page);
  const aboutUs = new AboutUsPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToAboutUs();
  await aboutUs.verifyThatAboutUsElementsAreVisible();
});

test("Verify that AboutUsPopup can be close on close buton", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const aboutUs = new AboutUsPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToAboutUs();
  await aboutUs.closeButton.click();
  await expect(aboutUs.aboutUsTitle).not.toBeVisible();
});
test("Verify that AboutUsPopup can be close on close X buton", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const aboutUs = new AboutUsPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToAboutUs();
  await aboutUs.closeXButton.click();
await expect(aboutUs.aboutUsTitle).not.toBeVisible();

});
