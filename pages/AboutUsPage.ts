import { Page, Locator, expect } from "@playwright/test";

class AboutUsPage {
  readonly page: Page;
  readonly aboutUsTitle: Locator;
  readonly closeButton: Locator;
  readonly closeXButton: Locator;
  readonly aboutUsLink: Locator;
  readonly aboutUsWindow: Locator;
  readonly aboutUsClosedWindow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aboutUsWindow = page.locator(
      '#videoModal:not([style*="display: block"])'
    );
  this.aboutUsTitle = page.getByRole('heading', { name: 'About us', exact: true });

    this.closeButton = page
      .locator("#videoModal")
      .getByText("Close", { exact: true });
    this.closeXButton = page.locator("#videoModal").getByLabel("Close");

    this.aboutUsLink = page.getByRole("link", { name: "About us" });
  }
  async waitForTimeout(duration: number) {
    await this.page.waitForTimeout(duration);
  }
  async goTo() {
    await this.aboutUsLink.click();
  }
}

export { AboutUsPage };
