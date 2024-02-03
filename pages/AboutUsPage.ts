import { Page, Locator, expect } from "@playwright/test";

class AboutUsPage {
  readonly page: Page;
  readonly aboutUsTitle: Locator;
  readonly closeButton: Locator;
  readonly closeXButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aboutUsTitle = page.getByRole("heading", {
      name: "About us",
      exact: true,
    });
    this.closeButton = page
      .locator("#videoModal")
      .getByText("Close", { exact: true });
    this.closeXButton = page.locator("#videoModal").getByLabel("Close");
  }

  async verifyThatAboutUsElementsAreVisible() {
      await expect(this.aboutUsTitle).toBeVisible();
      await expect(this.closeButton).toBeVisible();
      await expect(this.closeXButton).toBeVisible();
  }

}
export { AboutUsPage };
