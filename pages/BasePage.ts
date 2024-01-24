import { Page, expect } from "@playwright/test";

class BasePage {
  constructor(public page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url, { waitUntil: "networkidle" });
  }
}

export default BasePage;
