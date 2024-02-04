
import { test, expect } from "@playwright/test";
import { popuUpMessage } from "../../ReusableMethod/Methods";

test("Verify on login page all required boxes are visible", async ({
  page,
}) => {
  await page.goto("https://demoblaze.com/");
  await page.getByRole("link", { name: "Log in" }).click();
  await expect(page.locator("#loginusername")).toBeVisible();
  await expect(page.locator("#loginpassword")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
  await expect(page.getByLabel("Log in").getByText("Close")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();
  await expect(page.getByLabel("Log in").getByLabel("Close")).toBeVisible();
  await expect(page.getByLabel("Log in").getByText("Username:")).toBeVisible();
  await expect(page.getByLabel("Log in").getByText("Password:")).toBeVisible();
});

test("Verify Login without any creds", async ({ page }) => {
  await popuUpMessage(page, "Please fill out Username and Password.");
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
  await popuUpMessage(page, "Wrong password.");

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
  await page.waitForTimeout(1000);
});
