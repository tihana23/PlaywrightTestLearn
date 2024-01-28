import { Page, Locator, expect } from "@playwright/test";

class AboutUsPage {
  readonly page: Page;
  readonly aboutUsLink: Locator;
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

  async verifyThatAboutUsTitleIsVisible() {
    await expect(this.aboutUsTitle).toBeVisible();
  }

  async verifyCloseButtonIsVisible() {
    await expect(this.closeButton).toBeVisible();
  }
  async closeAboutUsForm() {
    await this.closeButton.click();
  }
  async closeAboutUsFormOnXButton() {
    await this.closeXButton.click();
  }
}
export { AboutUsPage };
