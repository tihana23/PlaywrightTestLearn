import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { HomePage } from "../../../pages/HomePage";
test("Verify HomePage", async ({ page }) => {
  const homePage = new HomePage(page);
  homePage.goToHomePage();
  await expect(page).toHaveScreenshot("HomePageVisual.png");
});
