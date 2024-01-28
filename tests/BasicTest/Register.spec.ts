import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { popuUpMessage } from "../../ReusableMethod/Methods";
const username = faker.person.firstName();
const password = faker.person.lastName();

test("Verify that register page is open and all fields are visible ", async ({
  page,
}) => {
  await page.goto("https://demoblaze.com/");
  await page.getByRole("link", { name: "Sign up" }).click();
  await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible();
  await expect(page.getByLabel("Sign up").getByText("Username:")).toBeVisible();
  await expect(page.getByLabel("Username:")).toBeVisible();
  await expect(page.getByLabel("Sign up").getByText("Password:")).toBeVisible();
  await expect(page.getByLabel("Password:")).toBeVisible();
  await expect(page.getByLabel("Sign up").getByLabel("Close")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  await expect(page.getByLabel("Sign up").getByText("Close")).toBeVisible();
  await page.getByLabel("Sign up").getByLabel("Close").click();
});

test("Verify that register process test with empty credentials shown popup error", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  await popuUpMessage(page, "Please fill out Username and Password.");
  await page.click("a#signin2");
  await page.click('button[onclick="register()"]');
});

test("Verify that register process test with existing credentials shown popup error", async ({
  page,
}) => {
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
  await page.waitForTimeout(1000);
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
