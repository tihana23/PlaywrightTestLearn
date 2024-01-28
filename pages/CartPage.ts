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
    this.closeButton = page.locator(
      "xpath=/html/body/div[3]/div/div/div[3]/button[1]"
    );
    this.totalAmount = page.locator("#totalp");
    this.placeOrderModalHeader = page.locator(
      'div.modal-header:has-text("Place order")'
    );
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
  }

  async verifyCurrentURL() {
    await expect(this.page).toHaveURL("https://www.demoblaze.com/cart.html");
  }
  async verifyPageTitle() {
    await expect(this.pageTitleCart).toBeVisible();
  }

  async verifyVisabilityAllElementsOnPage() {
    await expect(this.pageTitleCart).toBeVisible();
    await expect(this.pageTotalCart).toBeVisible();
    await expect(this.pageProductsGridPicture).toBeVisible();
    await expect(this.pageProductsGridTitle).toBeVisible();
    await expect(this.pageProducGridPrice).toBeVisible();
    await expect(this.pageProducGridX).toBeVisible();
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
  async clickPlaceOrderButton() {
    await this.placeOrderButtonCartPage.click();
    await expect(this.placeOrderPopupHeading).toBeVisible();
  }
  async clickPurchaseButton() {
    await this.placeOrderPopupPurchaseButton.click();
  }
  async verifyProductInCart(productName: string) {
    const productLocator = this.productNameLocator(productName);
    await expect(productLocator).toBeVisible({ timeout: 50000 });
  }
  async verifyIsthereAnyProductInCart(productName: string) {
    await this.page.waitForLoadState("networkidle");
    const productLocators = this.productNameLocator(productName);
    const count = await productLocators.count();

    // Check if there's at least one element with the product name
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

  async closePlaceOrderPopupOnCloseButton() {
    await this.placeOrderPopupCloseButton.click();
    await expect(this.placeOrderModalHeader).not.toBeVisible();
  }
  async closePlaceOrderPopupOnXButton() {
    await this.placeOrderPopupXCloseButton.click();
    await expect(this.placeOrderModalHeader).not.toBeVisible();
  }
  async placeOrderWithRandomData(expectedTotal: number) {
    await this.purchaseButton.click();
    await expect(this.placeOrderModalHeader).toBeVisible();

    // Fill in the Place Order form with random data
    const name = faker.person.firstName();
    const country = faker.location.country();
    const city = faker.location.city();
    const card = faker.finance.creditCardNumber();
    const month = faker.date.month();
    const year = faker.date.future().getFullYear().toString();

    await this.placeOrderPopupTextboxName.fill(name);
    await this.placeOrderPopupTextboxCountry.fill(country);
    await this.placeOrderPopupTextboxCity.fill(city);
    await this.placeOrderPopupTextboxCreditCard.fill(card);
    await this.placeOrderPopupTextboxMonth.fill(month);
    await this.placeOrderPopupTextboxYear.fill(year);

    await this.placeOrderPopupPurchaseButton.click();

    // Verify the order confirmation
    const thankYouMessageLocator = this.page.locator(
      'h2:has-text("Thank you for your purchase!")'
    );
    await expect(thankYouMessageLocator).toContainText(
      "Thank you for your purchase!"
    );
    const amountPopup = this.page.locator("p.lead.text-muted");
    const namePopup = this.page.locator("p.lead.text-muted >> text=/Name: .+/");
    const tyMessageExpected = "Thank you for your purchase!";
    const thankYouMessageTextActual = await thankYouMessageLocator.textContent({
      timeout: 30000,
    });
    expect(tyMessageExpected).toEqual(thankYouMessageTextActual);
    const amountText = await amountPopup.textContent({ timeout: 30000 });
    // Initialize a variable to hold the parsed amount
    let amount = 0;
    if (amountText !== null) {
      const amountMatch = amountText.match(/Amount: (\d+) USD/);
      if (amountMatch) {
        amount = parseFloat(amountMatch[1]);
      }
    }

    const nameText = await namePopup.textContent();
    let nameFromPopup = "";
    if (nameText !== null) {
      const nameMatch = nameText.match(/Name: (.+?)(?=Date)/);
      if (nameMatch) {
        nameFromPopup = nameMatch[1].trim();
      }
    }

    expect(expectedTotal).toBe(amount);
    expect(nameFromPopup).toBe(name);
  }
}
export { CartPage };
