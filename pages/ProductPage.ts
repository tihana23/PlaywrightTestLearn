import { Page, Locator, expect } from "@playwright/test";
import { popuUpMessage } from "../ReusableMethod/Methods";
class ProductPage {
  readonly page: Page;
  readonly productLink: (productName: string) => Locator;
  readonly productHeading: (productName: string) => Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly productImage: Locator;
  readonly productDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productHeading = (productName: string) =>
      page.getByRole("heading", { name: productName });
    this.addToCartButton = page.getByRole("link", { name: "Add to cart" });
    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
    this.productImage = page.locator("#imgp img");
    this.productDescription = page.getByText("Product description");
  }

  async verifyProductIsOpenAndAllFielsAreVisible(productName: string) {
    await expect(this.productHeading(productName)).toBeVisible();
    await expect(this.productImage).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }
 
  async addProductToCart() {
    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000);
  }
}
export { ProductPage };
