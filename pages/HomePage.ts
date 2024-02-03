import { Page, Locator, expect } from "@playwright/test";
import { verifyNextAndPreviousButton } from "../ReusableMethod/Methods";
import { CartPage } from "./CartPage";
import { ProductPage } from "./ProductPage";
import { NavigationBar } from "./NavigationBar";

class HomePage {
  readonly page: Page;
  readonly homePageElement: Locator;
  readonly categoriesHeadline: Locator;
  readonly phonesCategory: Locator;
  readonly laptopsCategory: Locator;
  readonly monitorsCategory: Locator;
  readonly productLink: (productName: string) => Locator;
  readonly product: (productName: string) => Locator;
  readonly nextButton1: Locator;
  readonly previousButton1: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;
  readonly categoriesGrid: Locator;
  readonly productLinks: Locator;
  readonly closeButtonInPopup: Locator;

  productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePageElement = page.getByText("Home")
    this.categoriesHeadline = page.locator("text=CATEGORIES");
    this.phonesCategory = page.getByRole("link", { name: "Phones" });
    this.laptopsCategory = page.getByRole("link", { name: "Laptops" });
    this.monitorsCategory = page.getByRole("link", { name: "Monitors" });
    this.productLink = (productName: string) =>
      page.locator(`a.hrefch`, { hasText: productName });
    this.nextButton1 = page.locator('button[id="next2"]');
    this.previousButton1 = page.locator('button[id="prev2"]');
    this.productTitles = page.locator(".card-title a");
    this.nextButton = page.locator("span.sr-only", { hasText: "Next" });
    this.previousButton = page.locator("span.sr-only", { hasText: "Previous" });
    this.categoriesGrid = page.locator("div.some-grid-or-class-name"); 
    this.productLinks = page.locator("a.hrefch");
    this.closeButtonInPopup = page.locator(".modal-footer >> text=Close");
  }

  async goTo() {
    await this.page.goto("https://www.demoblaze.com/", {
      waitUntil: "networkidle",
    });
  }
  async verifyCurrentURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async verifyWebPageTitle(expectedText: string) {
    await expect(this.page).toHaveTitle(expectedText);
  }

  
  async navigateToPhonesCategory() {
    await expect(this.phonesCategory).toBeVisible();
    await this.phonesCategory.click({ timeout: 15000 });
  }

  async navigateToLaptopsCategory() {
    await expect(this.laptopsCategory).toBeVisible();
    await this.laptopsCategory.click({ timeout: 15000 });
  }

  async navigateToMonitorsCategory() {
    await expect(this.monitorsCategory).toBeVisible();
    await this.monitorsCategory.click({ timeout: 15000 });
    await this.page.waitForTimeout(1000);
  }

  async selectProduct(productName: string) {
    const link = this.productLink(productName);
    await link.click();
  }

 
  async verifyNextButton() {
    const expectedSlides = [
      { src: "Samsung1.jpg", alt: "First slide" },
      { src: "nexus1.jpg", alt: "Second slide" },
      { src: "iphone1.jpg", alt: "Third slide" },
    ];
    
    await verifyNextAndPreviousButton(
      this.page,
      this.nextButton,
      expectedSlides
    );
  }
  async verifyPreviousButton() {
    const expectedSlides = [
      { src: "Samsung1.jpg", alt: "First slide" },
      { src: "iphone1.jpg", alt: "Third slide" },
      { src: "nexus1.jpg", alt: "Second slide" },
    ];
    await verifyNextAndPreviousButton(
      this.page,
      this.previousButton,
      expectedSlides
    );
  }

  async waitForProduct(productName: string) {
    const link = this.productLink(productName);
    await link.waitFor();
  }

  async getProductTitles() {
    await this.productTitles.first().waitFor();
    return this.page.$$eval(".card-title a", (elements) =>
      elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
    );
  }

  //connectedMethods
  async selectOneItemFromPageAndAddItToCart(productName: string) {
    const cartPage = new CartPage(this.page);
    const productPage = new ProductPage(this.page);
    const navigationBar = new NavigationBar(this.page);
    await this.goTo();
    await this.selectProduct(productName);
    await productPage.addProductToCart();
    await navigationBar.navigateToCart();
    await cartPage.verifyProductInCart(productName);
  }
  async selectOneItemFromCategoriesAndAddItToCart(productName: string) {
    const cartPage = new CartPage(this.page);
    const productPage = new ProductPage(this.page);
    const navigationBar = new NavigationBar(this.page);
    await this.selectProduct(productName);
    await productPage.addProductToCart();
    await navigationBar.navigateToCart();
    await cartPage.verifyProductInCart(productName);
  }
}

export { HomePage };
