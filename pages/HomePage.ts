import { Page, Locator, expect } from "@playwright/test";
import { verifyNextAndPreviousButton } from "../ReusableMethod/Methods";
import { CartPage } from "./CartPage";
import { ProductPage } from "./ProductPage";

class HomePage {
  readonly page: Page;
  readonly homePageElement: Locator;
  readonly contactsLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly logoutButton: Locator;
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
  readonly loginUsernameInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly productLinks: Locator;
  readonly closeButtonInPopup: Locator;

  productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePageElement = page.getByText("Home");
    this.contactsLink = page.getByRole("link", { name: "Contact" });
    this.aboutUsLink = page.getByRole("link", { name: "About us" });
    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.registerLink = page.getByRole("link", { name: "Sign up" });
    this.logoutButton = page.locator("#logout2");
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
    this.categoriesGrid = page.locator("div.some-grid-or-class-name"); // Replace with actual selector
    this.loginUsernameInput = page.locator('input[id="loginusername"]');
    this.loginPasswordInput = page.locator('input[id="loginpassword"]');
    this.loginSubmitButton = page.locator('button[onclick="logIn()"]');
    this.productLinks = page.locator("a.hrefch"); // Adjust selector as needed
    this.closeButtonInPopup = page.locator(".modal-footer >> text=Close");
    // ... initialize more elements as needed
  }

  async goToHomePage() {
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

  async verifyElementExists(locator: Locator, shouldExist: boolean = true) {
    if (shouldExist) {
      await expect(locator).toBeVisible();
    } else {
      await expect(locator).toBeHidden();
    }
  }

  async navigateToContacts() {
    await this.contactsLink.click();
  }

  async navigateToAboutUs() {
    await this.aboutUsLink.click();
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async openLoginPopup() {
    await this.loginLink.click();
  }

  async openRegisterPopup() {
    await this.registerLink.click();
  }

  async verifyCategoriesHeadline() {
    await expect(this.categoriesHeadline).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.logoutButton).toBeHidden();
    await expect(this.loginLink).toBeVisible();
  }

  async navigateToPhonesCategory() {
    await expect(this.phonesCategory).toBeVisible();
    await this.phonesCategory.click({ timeout: 5000 });
  }

  async navigateToLaptopsCategory() {
    await expect(this.laptopsCategory).toBeVisible();
    await this.laptopsCategory.click({ timeout: 5000 });
  }

  async navigateToMonitorsCategory() {
    await expect(this.monitorsCategory).toBeVisible();
    await this.monitorsCategory.click({ timeout: 5000 });
    await this.page.waitForTimeout(1000);
  }

  async selectProduct(productName: string) {
    const link = this.productLink(productName);
    await link.click();
  }

  async clickNextButtonInCarousel() {
    await this.nextButton.click();
  }

  async clickPreviousButtonInCarousel() {
    await this.previousButton.click();
  }

  async clickOnProductByName(productName: string) {
    await this.productLinks.locator(`text=${productName}`).click();
  }

  async verifyProductPage(productName: string) {
    const productHeader = this.page.locator(`h2.name`, {
      hasText: productName,
    });
    await expect(productHeader).toBeVisible();
  }

  async verifyElementVisibility(
    locator: Locator,
    shouldBeVisible: boolean = true
  ) {
    if (shouldBeVisible) {
      await expect(locator).toBeVisible();
    } else {
      await expect(locator).not.toBeVisible();
    }
  }

  // Method to navigate to different categories based on category name
  async navigateToCategory(categoryName: string) {
    const categoryLink = this.page.locator(`text=${categoryName}`);
    await categoryLink.click();
  }

  // Method to interact with modal popups
  async interactWithModal(modalAction: "open" | "close", modalName: string) {
    const modalLocator = this.page.locator(`text=${modalName}`);
    if (modalAction === "open") {
      await modalLocator.click();
    } else if (modalAction === "close") {
      const closeModalButton = modalLocator.locator("button", {
        hasText: "Close",
      });
      await closeModalButton.click();
    }
  }
  async clickNextButton() {
    await this.nextButton1.click();
  }

  async clickPrevButton() {
    await this.previousButton1.click();
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
    await this.goToHomePage();
    await this.selectProduct(productName);
    await productPage.addProductToCart();
    await this.navigateToCart();
    await cartPage.verifyProductInCart(productName);
  }
  async selectOneItemFromCategoriesAndAddItToCart(productName: string) {
    const cartPage = new CartPage(this.page);
    const productPage = new ProductPage(this.page);
    await this.selectProduct(productName);
    await productPage.addProductToCart();
    await this.navigateToCart();
    await cartPage.verifyProductInCart(productName);
  }
}

export { HomePage };
