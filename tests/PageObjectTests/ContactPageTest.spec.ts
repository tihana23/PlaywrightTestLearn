import { test, expect} from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import {
  popuUpMessage,

} from "../../ReusableMethod/Methods";
import { ContactPage } from "../../pages/ContactPage";

import { faker } from "@faker-js/faker";
import { NavigationBar } from "../../pages/NavigationBar";
test("Verify that contact page is open correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToContacts();
  await expect(contactPage.headingNewMessageLabel).toBeVisible();
});
test("Verify that contact page have all fields visible", async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToContacts();
  await expect(contactPage.contactEmailInput).toBeVisible();
  await expect(contactPage.contactNameInput).toBeVisible();
  await expect(contactPage.contactMessageTextarea).toBeVisible();
  await expect(contactPage.submitButton).toBeVisible();
  await expect(contactPage.contactEmailInputLabel).toBeVisible();
  await expect(contactPage.contactNameInputLabel).toBeVisible();
  await expect(contactPage.contactMessageTextareaLabel).toBeVisible();
  await expect(contactPage.contactCloseButton).toBeVisible();
  await expect(contactPage.contactCloseXButton).toBeVisible();
});
test("Verify that contact page is can be close correctly", async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToContacts();
  await expect(contactPage.headingNewMessageLabel).toBeVisible();
  await contactPage.contactCloseButton.click();
  await expect(contactPage.headingNewMessageLabel).not.toBeVisible();
});
test("Verify that contact page can be close on X correctly", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToContacts();
  await expect(contactPage.headingNewMessageLabel).toBeVisible();
  await contactPage.contactCloseXButton.click();
  await expect(contactPage.headingNewMessageLabel).not.toBeVisible();
});
test("Verify that contact page can be filled and saved correctly with popup message", async ({
  page,
}) => {
  await popuUpMessage(page, "Thanks for the message!!");
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const navigationBar = new NavigationBar(page);
  await homePage.goTo();
  await navigationBar.navigateToContacts();
  const email = faker.person.fullName() + "sd@gg.hr";
  const name = faker.person.firstName();
  const message = "this is some message";
  await contactPage.fillContactForm(email, name, message);
  await contactPage.submitButton.click();
});
