import { test, expect } from "../fixtures/basePage";

import { faker } from "@faker-js/faker";

test("Verify that contact page is open correctly", async ({
  homePage,
  contactPage,
}) => {
  await homePage.goTo();
  await contactPage.goTo();
  await expect(contactPage.headingNewMessageLabel).toBeVisible();
});
test("Verify that contact page have all fields visible", async ({
  homePage,
  contactPage,
}) => {
  await homePage.goTo();
  await contactPage.goTo();
  await expect.soft(contactPage.contactEmailInput).toBeVisible();
  await expect.soft(contactPage.contactNameInput).toBeVisible();
  await expect.soft(contactPage.contactMessageTextarea).toBeVisible();
  await expect.soft(contactPage.submitButton).toBeVisible();
  await expect.soft(contactPage.contactEmailInputLabel).toBeVisible();
  await expect.soft(contactPage.contactNameInputLabel).toBeVisible();
  await expect.soft(contactPage.contactMessageTextareaLabel).toBeVisible();
  await expect.soft(contactPage.contactCloseButton).toBeVisible();
  await expect(contactPage.contactCloseXButton).toBeVisible();
});
test("Verify that contact page is can be close correctly", async ({
  homePage,
  contactPage,
}) => {
  await homePage.goTo();
  await contactPage.goTo();
  await expect.soft(contactPage.headingNewMessageLabel).toBeVisible();
  await contactPage.contactCloseButton.click();
  await expect(contactPage.headingNewMessageLabel).not.toBeVisible();
});
test("Verify that contact page can be close on X correctly", async ({
  homePage,
  contactPage,
}) => {
  await homePage.goTo();
  await contactPage.goTo();
  await expect.soft(contactPage.headingNewMessageLabel).toBeVisible();
  await contactPage.contactCloseXButton.click();
  await expect(contactPage.headingNewMessageLabel).not.toBeVisible();
});
test("Verify that contact page can be filled and saved correctly with popup message", async ({
  homePage,
  contactPage,
}) => {
  await homePage.goTo();
  await contactPage.goTo();
  await contactPage.setupDialogHandler();
  const email = faker.person.fullName() + "sd@gg.hr";
  const name = faker.person.firstName();
  const message = "this is some message";
  await contactPage.fillContactForm(email, name, message);
  await contactPage.submitButton.click();
  expect(contactPage.getDialogMessage()).toEqual("Thanks for the message!!");
});
