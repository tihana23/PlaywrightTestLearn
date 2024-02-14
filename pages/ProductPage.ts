import { Page, Locator, expect } from "@playwright/test";

class ProductPage {
  readonly page: Page;
  readonly productName: string;
  readonly productLinkSamsungS6: Locator;
  readonly productLinkMcBookAir: Locator;
  readonly productLinkAppleMonitor: Locator; // Now a static locator, initialized in the constructor
  readonly productHeadingSamsungS6: Locator;
  readonly productHeadingMcBookAir: Locator;
  readonly productHeadingAppleMonitor: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly productImage: Locator;
  readonly productDescription: Locator;
  readonly productLinkNokia: Locator;
  readonly productHeadingNokia: Locator;
  private lastDialogMessage: string;

  constructor(page: Page) {
    this.page = page;
    // Initialize the product link and heading locators based on the provided product name
    this.productLinkSamsungS6 = page.locator(`a:has-text("Samsung galaxy s6")`);
    this.productLinkMcBookAir = page.locator(`a:has-text("MacBook air")`);
    this.productLinkAppleMonitor = page.locator(
      `a:has-text("Apple monitor 24")`
    );
    this.productLinkNokia = page.locator(`a:has-text("Nokia lumia 1520")`);
    this.productHeadingSamsungS6 = page.getByRole("heading", {
      name: "Samsung galaxy s6",
    });
    this.productHeadingMcBookAir = page.getByRole("heading", {
      name: "MacBook air",
    });
    this.productHeadingAppleMonitor = page.getByRole("heading", {
      name: "Apple monitor 24",
    });
    this.productHeadingNokia = page.getByRole("heading", {
      name: "Nokia lumia 1520",
    });
    this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
    this.productImage = page.locator("#imgp img");
    this.productDescription = page.getByText("Product description");
  }

  async waitForTimeout(duration: number) {
    await this.page.waitForTimeout(duration);
  }
  async setupDialogHandler() {
    this.page.on("dialog", async (dialog) => {
      this.lastDialogMessage = dialog.message();
      await dialog.accept();
    });
  }
  getDialogMessage(): string {
    return this.lastDialogMessage;
  }
}
export { ProductPage };
