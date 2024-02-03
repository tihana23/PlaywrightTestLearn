import { Page, Locator, expect } from "@playwright/test";

class NavigationBar {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly contactsLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly productTitles: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.contactsLink = page.getByRole("link", { name: "Contact" });
    this.aboutUsLink = page.getByRole("link", { name: "About us" });
    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.signUpLink = page.getByRole("link", { name: "Sign up" });
    this.logoutLink = page.locator("#logout2");
  }

  async navigateToHome() {
    await this.homeLink.click();
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

  async navigateToLogin() {
    await this.loginLink.click();
  }

  async navigateToSignUp() {
    await this.signUpLink.click();
  }
  async navigateToLogOut() {
    await this.logoutLink.click();
    await expect(this.logoutLink).toBeHidden();
    await expect(this.loginLink).toBeVisible();
  }

  async verifyAllNavBarLinksAreVisible() {
    await expect(this.homeLink).toBeVisible();
    await expect(this.aboutUsLink).toBeVisible();
    await expect(this.aboutUsLink).toBeVisible();
    await expect(this.cartLink).toBeVisible();
    await expect(this.loginLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }
}
export { NavigationBar };
