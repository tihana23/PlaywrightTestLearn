import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { popuUpMessage } from "../ReusableMethod/Methods";

test("Verify Login without any creds", async ({ page }) => {
  await popuUpMessage(
    page,
    "Please fill out Username and Password.",
    async (dialog) => {
      await dialog.accept();
    }
  );

  await page.goto("https://www.demoblaze.com/  ");
  await page.click("a#login2");
  await page.click('button[onclick="logIn()"]');
});
test("Login process test with valid credentials", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  await page.click("a#login2");
  const username1 = "tihana";
  const password1 = "123456";
  const userNameTextbox = page.locator("#loginusername");
  await userNameTextbox.waitFor();
  await userNameTextbox.fill(username1);
  const passwordTextbox = page.locator("#loginpassword");
  await passwordTextbox.waitFor();
  await passwordTextbox.fill(password1);
  await page.click('button[onclick="logIn()"]');
  await expect(page.locator("a#nameofuser")).toContainText("Welcome tihana");
});
test("Verify Login with wrong credentials", async ({ page }) => {
  await popuUpMessage(page, "Wrong password.", async (dialog) => {
    await dialog.accept();
  });
  await page.goto("https://www.demoblaze.com/");
  const loginButton = page.locator("a#login2");
  await loginButton.click();
  const username1 = "tihana";
  const password1 = "124535";
  const userNameTextbox = page.locator("#loginusername");
  await userNameTextbox.waitFor();
  await userNameTextbox.fill(username1);
  const passwordTextbox = page.locator("#loginpassword");
  await passwordTextbox.waitFor();
  await passwordTextbox.fill(password1);
  await page.click('button[onclick="logIn()"]');
});
