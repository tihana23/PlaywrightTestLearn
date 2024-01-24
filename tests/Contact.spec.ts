import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { popuUpMessage } from "../ReusableMethod/Methods";
const username = faker.person.firstName();
const password = faker.person.lastName();

test("Verify that contact form has all correct labels", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });
  await contactsLink.click();
  await page.waitForSelector("label.form-control-label", {
    state: "visible",
    timeout: 5000,
  });
  const contactEmailLabel = page.locator("label.form-control-label", {
    hasText: "Contact Email:",
  });
  await expect(contactEmailLabel).toBeVisible();

  const contactNameLabel = page.locator("label.form-control-label", {
    hasText: "Contact Name:",
  });
  await expect(contactNameLabel).toBeVisible();

  const contactMessageLabel = page.locator("label.form-control-label", {
    hasText: "Message:",
  });
  await expect(contactMessageLabel).toBeVisible();
});

test("Verify that contact form have all correct textboxes", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });
  contactsLink.click();
  await page.waitForSelector("label.form-control-label", {
    state: "visible",
    timeout: 5000,
  });
  const contactEmailTextbox = page.locator("#recipient-email");
  await expect(contactEmailTextbox).toBeVisible();

  const contactNameTextbox = page.locator("#recipient-name");
  await expect(contactNameTextbox).toBeVisible();

  const contactMessageTextbox = page.locator("#message-text");
  await expect(contactMessageTextbox).toBeVisible();
});

test("Verify that contact form can be opened", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });
  await contactsLink.click();
  await page.waitForSelector("label.form-control-label", {
    state: "visible",
    timeout: 5000,
  });
  // Verify that the form is visible
  const contactForm = page.locator("div#exampleModal");
  await expect(contactForm).toBeVisible();
});

test("Verified that contact form can be filled correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });
  await contactsLink.click();
  const contactEmailTextbox = page.locator("#recipient-email");
  const contactNameTextbox = page.locator("#recipient-name");
  const contactMessageTextbox = page.locator("#message-text");

  const email = faker.person.fullName() + "sd@gg.hr";
  await contactEmailTextbox.fill(email);
  const name = faker.person.firstName();
  await contactNameTextbox.fill(name);
  const message = "this is some message";
  await contactMessageTextbox.fill(message);

  expect(await contactEmailTextbox.inputValue()).toBe(email);
  expect(await contactNameTextbox.inputValue()).toBe(name);
  expect(await contactMessageTextbox.inputValue()).toBe(message);
});

test("Verify that contact can be saved correctly", async ({ page }) => {
  await popuUpMessage(page, "Thanks for the message!!", async (dialog) => {
    await dialog.accept();
  });
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });
  await contactsLink.click();
  const contactEmailTextbox = page.locator("#recipient-email");
  const contactNameTextbox = page.locator("#recipient-name");
  const contactMessageTextbox = page.locator("#message-text");

  const email = faker.person.fullName() + "sd@gg.hr";
  await contactEmailTextbox.fill(email);
  const name = faker.person.firstName();
  await contactNameTextbox.fill(name);
  const message = "this is some message";
  await contactMessageTextbox.fill(message);

  expect(await contactEmailTextbox.inputValue()).toBe(email);
  expect(await contactNameTextbox.inputValue()).toBe(name);
  expect(await contactMessageTextbox.inputValue()).toBe(message);
  await page.click('button[onclick="send()"]');
});
