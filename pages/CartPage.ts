import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

class CartPage {
  readonly page: Page;
  readonly pageTitleCart: Locator;
  readonly deleteButton: Locator;
  readonly purchaseButton: Locator;
  readonly closeButton: Locator;
  readonly totalAmount: Locator;
  readonly placeOrderModalHeader: Locator;
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
  readonly cartLink: Locator;
  readonly cartNokia: Locator;
  readonly cartSamsungS6: Locator;
  readonly cartMcBookAir: Locator;
  readonly cartAppleMonitor: Locator;
  readonly productRowCartSamsung: Locator;
  readonly productRowCartNokia: Locator;
  private lastDialogMessage: string;

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

    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
    this.cartNokia = page
      .getByRole("cell", { name: "Nokia lumia 1520" })
      .first();
    this.cartSamsungS6 = page
      .getByRole("cell", { name: "Samsung galaxy s6" })
      .first();
    this.cartMcBookAir = page
      .getByRole("cell", { name: "MacBook air" })
      .first();
    this.cartAppleMonitor = page
      .getByRole("cell", {
        name: "Apple monitor 24",
      })
      .first();

    this.productRowCartSamsung = page.locator(
      'tr.success:has-text("Samsung galaxy s6")'
    );
    this.productRowCartNokia = page.locator(
      'tr.success:has-text("Nokia lumia 1520")'
    );
  }
  async goTo() {
    await this.cartLink.click();
  }
  async waitForPopupMessage(popupMessage: string) {
    const popupMessageSelector = `text="${popupMessage}"`;
    await this.page.waitForSelector(popupMessageSelector, {
      state: "visible",
    });
  }
  public get currentPage() {
    return this.page;
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

    await expect(expectedTotal).toBe(amountFromPopup);
    await expect(nameFromPopup).toBe(orderData.name);
  }

  async getPriceFromCart(productRow: Locator): Promise<number> {
    const priceText = await productRow.locator("td:nth-child(3)").textContent();
    if (priceText !== null) {
      return parseFloat(priceText);
    } else {
      console.error(`Price not found for the specified product`);
      return 0;
    }
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

export { CartPage };
