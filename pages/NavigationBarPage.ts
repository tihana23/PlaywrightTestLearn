import { Page, Locator } from "@playwright/test";

class NavigationBarPage {
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
 
}
export { NavigationBarPage };
