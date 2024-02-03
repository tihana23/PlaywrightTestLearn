import { Page, Locator, expect } from "@playwright/test";
import { popuUpMessage } from "../ReusableMethod/Methods";
import { faker } from "@faker-js/faker";

class CartPage {
  readonly page: Page;
  readonly pageTitleCart: Locator;
  readonly deleteButton: Locator;
  readonly purchaseButton: Locator;
  readonly closeButton: Locator;
  readonly totalAmount: Locator;
  readonly placeOrderModalHeader: Locator;
  readonly productNameLocator: (productName: string) => Locator;
  readonly placeOrderButtonCartPage: Locator;
  readonly placeOrderPopupHeading: Locator;
  readonly placeOrderPopupTotal: Locator;
  readonly placeOrderPopupLabelName: Locator;
  readonly placeOrderPopupLabelCountry: Locator;
  readonly placeOrderPopupTextboxCountry: Locator;
  readonly placeOrderPopupLabelCity: Locator;
  readonly placeOrderPopupTextboxCity: Locator;
  readonly placeOrderPopupLabelCreditCard: Locator;
  readonly placeOrderPopupTextboxCreditCard: Locator;
  readonly placeOrderPopupLabelMonth: Locator;
  readonly placeOrderPopupTextboxMonth: Locator;
  readonly placeOrderPopupLabelYear: Locator;
  readonly placeOrderPopupTextboxYear: Locator;
  readonly placeOrderPopupXCloseButton: Locator;
  readonly placeOrderPopupPurchaseButton: Locator;
  readonly placeOrderPopupCloseButton: Locator;
  readonly pageTotalCart: Locator;
  readonly pageProductsGridPicture: Locator;
  readonly pageProductsGridTitle: Locator;
  readonly pageProducGridPrice: Locator;
  readonly pageProducGridX: Locator;
  readonly placeOrderPopupTextboxName: Locator;
  readonly thankYouMessageLocator: Locator;
  readonly popupAmount: Locator;
  readonly popupName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleCart = page.getByRole("heading", { name: "Products" });
    this.pageTotalCart = page.getByRole("heading", { name: "Total" });
    this.pageProductsGridPicture = page.getByRole("cell", { name: "Pic" });
    this.pageProductsGridTitle = page.getByRole("cell", { name: "Title" });
    this.pageProducGridPrice = page.getByRole("cell", { name: "Price" });
    this.pageProducGridX = page.getByRole("cell", { name: "x" });
    this.deleteButton = page.getByRole("link", { name: "Delete" });
    this.purchaseButton = page.locator('button:has-text("Place Order")');
    this.totalAmount = page.locator("#totalp");
    this.productNameLocator = (productName: string) =>
      page.getByRole("cell", { name: productName });
    this.placeOrderButtonCartPage = page.getByRole("button", {
      name: "Place Order",
    });
    this.placeOrderPopupHeading = page.getByRole("heading", {
      name: "Place order",
    });
    this.placeOrderPopupTotal = page.getByText("Total:");
    this.placeOrderPopupLabelName = page.getByText("Name:", { exact: true });
    this.placeOrderPopupTextboxName = page.getByLabel("Name:", { exact: true });
    this.placeOrderPopupLabelCountry = page.getByText("Country:");
    this.placeOrderPopupTextboxCountry = page.getByLabel("Country:");
    this.placeOrderPopupLabelCity = page.getByText("City:");
    this.placeOrderPopupTextboxCity = page.getByLabel("City:");
    this.placeOrderPopupLabelCreditCard = page.getByText("Credit card:");
    this.placeOrderPopupTextboxCreditCard = page.getByLabel("Credit card:");
    this.placeOrderPopupLabelMonth = page.getByText("Month:");
    this.placeOrderPopupTextboxMonth = page.getByLabel("Month:");
    this.placeOrderPopupLabelYear = page.getByText("Year:");
    this.placeOrderPopupTextboxYear = page.getByLabel("Year:");
    this.placeOrderPopupXCloseButton = page
      .getByLabel("Place order")
      .getByLabel("Close");
    this.placeOrderPopupPurchaseButton = page.getByRole("button", {
      name: "Purchase",
    });
    this.placeOrderPopupCloseButton = page
      .getByLabel("Place order")
      .getByText("Close");
    this.thankYouMessageLocator = page.locator(
      'h2:has-text("Thank you for your purchase!")'
    );
    this.popupAmount = page.locator("p.lead.text-muted");
    this.popupName = page.locator("p.lead.text-muted >> text=/Name: .+/");
  }

  async verifyVisabilityAllElementsOnPopupPlaceOrderPage() {
    await expect(this.placeOrderPopupHeading).toBeVisible();
    await expect(this.placeOrderPopupTotal).toBeVisible();
    await expect(this.placeOrderPopupLabelName).toBeVisible();
    await expect(this.placeOrderPopupTextboxName).toBeVisible();
    await expect(this.placeOrderPopupLabelCountry).toBeVisible();
    await expect(this.placeOrderPopupTextboxCountry).toBeVisible();
    await expect(this.placeOrderPopupLabelCity).toBeVisible();
    await expect(this.placeOrderPopupTextboxCity).toBeVisible();
    await expect(this.placeOrderPopupLabelMonth).toBeVisible();
    await expect(this.placeOrderPopupTextboxMonth).toBeVisible();
    await expect(this.placeOrderPopupLabelYear).toBeVisible();
    await expect(this.placeOrderPopupTextboxYear).toBeVisible();
    await expect(this.placeOrderPopupXCloseButton).toBeVisible();
    await expect(this.placeOrderPopupPurchaseButton).toBeVisible();
    await expect(this.placeOrderPopupCloseButton).toBeVisible();
  }

  async verifyVisabilityAllElementsInCartPage() {
    await expect(this.pageTitleCart).toBeVisible();
    await expect(this.pageTotalCart).toBeVisible();
    await expect(this.pageProductsGridPicture).toBeVisible();
    await expect(this.pageProductsGridTitle).toBeVisible();
    await expect(this.pageProducGridPrice).toBeVisible();
    await expect(this.pageProducGridX).toBeVisible();
  }

  async verifyProductInCart(productName: string) {
    const productLocator = this.productNameLocator(productName);
    await expect(productLocator).toBeVisible({ timeout: 50000 });
  }
  async verifyIsthereAnyProductInCart(productName: string) {
    await this.page.waitForLoadState("networkidle");
    const productLocators = this.productNameLocator(productName);
    const count = await productLocators.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyDialogPopupLoginMessageWrongCredentials() {
    await popuUpMessage(this.page, "Please fill out Name and Creditcard.");
  }

  async verifyProductRemoved(productName: string) {
    const productLocator = this.productNameLocator(productName);
    await expect(productLocator).toBeHidden();
  }
  async removeProductFromCart(productName: string) {
    await this.deleteButton.click();
    await this.verifyProductRemoved(productName);
  }

  async verifyTotalAmount(expectedTotal: number) {
    const totalText = await this.totalAmount.textContent();
    const actualTotal = totalText ? parseFloat(totalText) : 0;
    expect(expectedTotal).toBe(actualTotal);
  }

  async generateRandomOrderData() {
    return {
      name: faker.person.firstName(),
      country: faker.location.country(),
      city: faker.location.city(),
      card: faker.finance.creditCardNumber(),
      month: faker.date.month(),
      year: faker.date.future().getFullYear().toString(),
    };
  }

  async fillData() {
    const orderData = await this.generateRandomOrderData();
    await this.placeOrderPopupTextboxName.fill(orderData.name);
    await this.placeOrderPopupTextboxCountry.fill(orderData.country);
    await this.placeOrderPopupTextboxCity.fill(orderData.city);
    await this.placeOrderPopupTextboxCreditCard.fill(orderData.card);
    await this.placeOrderPopupTextboxMonth.fill(orderData.month);
    await this.placeOrderPopupTextboxYear.fill(orderData.year);
    return orderData;
  }

  async getTextContent(locator, regex) {
    const text = await locator.textContent();
    return text && regex ? (text.match(regex) || [])[1] : text;
  }

  async placeOrderWithRandomData(expectedTotal: number) {
    await this.placeOrderButtonCartPage.click();
    const orderData = await this.fillData();
    await this.placeOrderPopupPurchaseButton.click();
    await expect(this.thankYouMessageLocator).toContainText(
      "Thank you for your purchase!"
    );
    const amountFromPopup =
      parseFloat(
        await this.getTextContent(this.popupAmount, /Amount: (\d+) USD/)
      ) || 0;
    const nameFromPopup =
      (await this.getTextContent(this.popupName, /Name: (.+?)(?=Date)/)) || "";

    expect(expectedTotal).toBe(amountFromPopup);
    expect(nameFromPopup).toBe(orderData.name);
  }
}
export { CartPage };
