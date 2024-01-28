import { Page, Locator, expect } from "@playwright/test";

class RegisterPage {
  readonly page: Page;
  readonly headerText: Locator;
  readonly usernameLabel: Locator;
  readonly passwordLabel: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeXButton: Locator;
  readonly closeButton: Locator;

  //dodati jos ostale x i to

  constructor(page: Page) {
    this.page = page;
    this.headerText = page.getByRole("heading", { name: "Sign up" });
    this.usernameLabel = page.getByLabel("Username:");
    this.passwordLabel = page.getByLabel("Password:");
    this.usernameInput = page.locator('input[id="sign-username"]');
    this.passwordInput = page.locator('input[id="sign-password"]');
    this.signUpButton = page.locator("button[onclick='register()']");
    this.closeXButton = page.getByLabel("Sign up").getByText("Close");
    this.closeButton = page.getByLabel("Sign up").getByLabel("Close");
  }
  async verifySignUpFormElementsAreVisible() {
    await expect(this.headerText).toBeVisible();
    await expect(this.usernameLabel).toBeVisible();
    await expect(this.passwordLabel).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
    await expect(this.closeXButton).toBeVisible();
    await expect(this.closeButton).toBeVisible();
  }

  async closeSignUpForm() {
    await this.closeButton.click();
  }
  async closeLoginOnXButton() {
    await this.closeXButton.click();
  }

  async verifyThatTextCanBeWrittenInUsernameAndPassword() {
    await this.usernameInput.fill("username");
    await this.passwordInput.fill("password");
  }

  async fillSignUpForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submitSignUpForm() {
    await this.signUpButton.click();
  }
}
export { RegisterPage };
