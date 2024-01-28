import { Page, Locator, expect } from "@playwright/test";
import { popuUpMessage, scrollFullPage } from "../ReusableMethod/Methods";
import { HomePage } from "./HomePage";
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

  async verifyAllElementsVisibility() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.closeButton).toBeVisible();
    await expect(this.loginHeading).toBeVisible();
    await expect(this.userNameLabel).toBeVisible();
    await expect(this.passwordLabel).toBeVisible();
  }

  async closeLoginForm() {
    await this.closeButton.click();
  }
  async closeLoginOnXButton() {
    await this.closeXButton.click();
  }

  async verifyThatTextCanBeWrittenInUsernameAndPassword() {
    await this.usernameInput.fill("username");
    await this.passwordInput.fill("password");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyPopupLoginMessageNonCredentials() {
    await popuUpMessage(this.page, "Please fill out Username and Password.");
  }

  async verifyPopupLoginMessageWrongCredentials() {
    await popuUpMessage(this.page, "User does not exist.");
  }
  async verifyLoginUser(expectedUsername: string) {
    const welcomeMessageLocator = this.page.locator("a#nameofuser");
    await expect(welcomeMessageLocator).toContainText(
      `Welcome ${expectedUsername}`
    );
  }
  async loginWithWorngCreds() {
    const homePage = new HomePage(this.page);
    await this.verifyPopupLoginMessageWrongCredentials();
    await homePage.goToHomePage();
    await homePage.openLoginPopup();
    await this.login("sdfada", "342424");
    await this.page.waitForTimeout(1000);
  }
  async logInWithRightCreds() {
    const homePage = new HomePage(this.page);
    await this.verifyPopupLoginMessageWrongCredentials();
    await homePage.goToHomePage();
    await homePage.openLoginPopup();
    await this.login("tihana", "123456");
    await this.page.waitForTimeout(1000);
  }
}
