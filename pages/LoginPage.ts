import { Page, Locator, expect } from "@playwright/test";

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

  readonly logoutLink: Locator;
  readonly loginLink: Locator;
 private lastDialogMessage: string;

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
    this.loginLink = page.getByRole("link", { name: "Log in" });

    this.logoutLink = page.locator("#logout2");
  }
  async goTo() {
    await this.loginLink.click();
  }
  async goToLogout() {
    await expect.soft(this.loginLink).not.toBeVisible();
    await this.logoutLink.click();
    await expect(this.loginLink).toBeVisible();
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
