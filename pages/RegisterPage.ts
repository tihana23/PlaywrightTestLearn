import { Page, Locator, expect } from "@playwright/test";


class RegisterPage {
  readonly page: Page;
  readonly registerHeading: Locator;
  readonly userNameLabel: Locator;
  readonly passwordLabel: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeXButton: Locator;
  readonly closeButton: Locator;
  readonly signUpLink: Locator;
  private lastDialogMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.registerHeading = page.getByRole("heading", { name: "Sign up" });
    this.userNameLabel = page.getByLabel("Username:");
    this.passwordLabel = page.getByLabel("Password:");
    this.usernameInput = page.locator('input[id="sign-username"]');
    this.passwordInput = page.locator('input[id="sign-password"]');
    this.signUpButton = page.locator("button[onclick='register()']");
    this.closeXButton = page.getByLabel("Sign up").getByText("Close");
    this.closeButton = page.getByLabel("Sign up").getByLabel("Close");
    this.signUpLink = page.getByRole("link", { name: "Sign up" });
  }
  async goTo() {
    await this.signUpLink.click();
  }

  async fillSignUpForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }
  async waitForTimeout(duration: number) {
    await this.page.waitForTimeout(duration);
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
export { RegisterPage };
