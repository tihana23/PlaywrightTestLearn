import { faker } from "@faker-js/faker";
import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
  Dialog,
} from "@playwright/test";
const username = faker.person.firstName();
const password = faker.person.lastName();

test("Verify that contact form has all correct labels", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });
  contactsLink.click();
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

test("Verify that contact can be filled correctly", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    const text = dialog.message();
    console.log(text);
    expect(dialog.message()).toBe("Thanks for the message!!");
    await dialog.accept();
  });
  await page.goto("https://www.demoblaze.com/");
  const contactsLink = page.locator("a.nav-link", { hasText: "Contact" });
  contactsLink.click();
  await page.waitForSelector("label.form-control-label", {
    state: "visible",
    timeout: 5000,
  });
  const contactEmailTextbox = page.locator("#recipient-email");
  await expect(contactEmailTextbox).toBeVisible();
  await page.waitForTimeout(2000);
  contactEmailTextbox.click();
  const email = faker.person.fullName() + "sd@gg.hr";
  contactEmailTextbox.fill(email);
  const isFieldFocused = await contactEmailTextbox.evaluate(
    (node) => document.activeElement === node
  );
  expect(isFieldFocused).toBeTruthy();
  const contactNameTextbox = page.locator("#recipient-name");
  await expect(contactNameTextbox).toBeVisible();
  await page.waitForTimeout(2000);
  contactNameTextbox.click();
  const name = faker.person.firstName();
  contactNameTextbox.fill(name);
  await page.screenshot({ path: "11.png" });
  const contactMessageTextbox = page.locator("#message-text");
  await expect(contactMessageTextbox).toBeVisible();
  await page.waitForTimeout(2000);
  contactMessageTextbox.click();
  const message = "this is some message";
  contactMessageTextbox.fill(message);
  await page.screenshot({ path: "12.png" });
  const fieldValue = await contactEmailTextbox.inputValue();
  expect(fieldValue).toBe(email);
  const fieldValue1 = await contactNameTextbox.inputValue();
  expect(fieldValue1).toBe(name);
  const fieldValue2 = await contactMessageTextbox.inputValue();
  expect(fieldValue2).toBe(message);
  await page.click('button[onclick="send()"]');
});
