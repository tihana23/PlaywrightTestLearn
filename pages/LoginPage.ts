import { Page, Locator, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { NavigationBar } from "./NavigationBar";
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly loginHeading: Locator;
  readonly userNameLabel: Locator;
  readonly passwordLabel: Locator;
  readonly closeXButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.closeButton = page.getByLabel("Log in").getByText("Close");
    this.closeXButton = page.getByLabel("Log in").getByLabel("Close");
    this.loginHeading = page.getByRole("heading", { name: "Log in" });
    this.userNameLabel = page.getByLabel("Log in").getByText("Username:");
    this.passwordLabel = page.getByLabel("Log in").getByText("Password:");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyLoginUser(expectedUsername: string) {
    const welcomeMessageLocator = this.page.locator("a#nameofuser");
    await expect(welcomeMessageLocator).toContainText(
      `Welcome ${expectedUsername}`
    );
  }

  async logInWithRightCreds() {
    const homePage = new HomePage(this.page);
    const navigationBar = new NavigationBar(this.page);
    await homePage.goTo();
    await navigationBar.navigateToLogin();
    await this.login("tihana", "123456");
    await this.page.waitForTimeout(1000);
  }
}
