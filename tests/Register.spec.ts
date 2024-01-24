import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { popuUpMessage } from "../ReusableMethod/Methods";
const username = faker.person.firstName();
const password = faker.person.lastName();

test("Verify that register process test with empty credentials shown popup error", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  await popuUpMessage(
    page,
    "Please fill out Username and Password.",
    async (dialog) => {
      await dialog.accept();
    }
  );
  await page.click("a#signin2");
  await page.click('button[onclick="register()"]');
});

test("Verify that register process test with existing credentials shown popup error", async ({
  page,
}) => {
  await popuUpMessage(page, "This user already exist.", async (dialog) => {
    await dialog.accept();
  });
  await page.goto("https://www.demoblaze.com/");
  await page.click("a#signin2");
  const username1 = "tihana";
  const password1 = "123456";
  await page.fill('input[id="sign-username"]', username1);
  await page.fill('input[id="sign-password"]', password1);
  const signUpButton = page.locator("button.btn.btn-primary", {
    hasText: "Sign up",
  });
  const buttonExists = (await signUpButton.count()) > 0;
  expect(buttonExists).toBeTruthy();
  const buttonIsVisible = await signUpButton.isVisible();
  expect(buttonIsVisible).toBeTruthy();
  const buttonIsEnabled = await signUpButton.isEnabled();
  expect(buttonIsEnabled).toBeTruthy();
  await signUpButton.click();
});

test("Register process and login with inserted data", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  await page.click("a#signin2");
  await page.fill('input[id="sign-username"]', username + username);
  await page.fill('input[id="sign-password"]', password);

  const buttonSign = page.locator("button[onclick='register()']");

  await buttonSign.click();
  await page.click("a#login2");
  await page.fill('input[id="loginusername"]', username + username);
  await page.fill('input[id="loginpassword"]', password);

  await page.click('button[onclick="logIn()"]');
  await expect(page.locator("a#nameofuser")).toContainText(
    "Welcome " + username + username
  );
});
