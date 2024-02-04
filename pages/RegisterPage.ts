import { Page, Locator, expect } from "@playwright/test";
import { popuUpMessage } from "../ReusableMethod/Methods";

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
  }
  async verifyThatAllElementsAreVisibleOnRegisterPage() {
    const elements: Locator[] = [
      this.usernameInput,
      this.passwordInput,
      this.signUpButton,
      this.closeButton,
      this.registerHeading,
      this.userNameLabel,
      this.passwordLabel,
      this.closeXButton,
    ];

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }
  async fillSignUpForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async registerNewUser(username: string, password: string) {
    await popuUpMessage(this.page, "Sign up successful.");

    await this.fillSignUpForm(username, password);
    await this.signUpButton.click();
    await this.page.waitForTimeout(1000);
  }
}
export { RegisterPage };
