import { Page, Locator, expect } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly contactEmailInput: Locator;
  readonly contactNameInput: Locator;
  readonly contactMessageTextarea: Locator;
  readonly submitButton: Locator;

  readonly headingNewMessageLabel: Locator;
  readonly contactEmailInputLabel: Locator;
  readonly contactNameInputLabel: Locator;
  readonly contactMessageTextareaLabel: Locator;
  readonly contactCloseXButton: Locator;
  readonly contactCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingNewMessageLabel = page.getByRole("heading", {
      name: "New message",
    });
    this.contactEmailInput = page.locator("#recipient-email");
    this.contactEmailInputLabel = page.getByText("Contact Email:");
    this.contactNameInput = page.locator("#recipient-name");
    this.contactNameInputLabel = page.getByText("Contact Name:");
    this.contactMessageTextarea = page.locator("#message-text");
    this.contactMessageTextareaLabel = page.getByText("Message:");
    this.submitButton = page.locator("button", { hasText: "Send message" });
    this.contactCloseXButton = page
      .getByLabel("New message")
      .getByLabel("Close");
    this.contactCloseButton = page.getByLabel("New message").getByText("Close");
  }

  
  async fillContactForm(email: string, name: string, message: string) {
    await this.contactEmailInput.fill(email);
    await this.contactNameInput.fill(name);
    await this.contactMessageTextarea.fill(message);
  }

  
}
