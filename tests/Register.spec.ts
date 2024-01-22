import { faker } from "@faker-js/faker";
import { test, expect, Dialog } from "@playwright/test";
const username = faker.person.firstName();
const password = faker.person.lastName();

test("Verify that register process test with empty credentials shown popup error", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  page.on("dialog", async (dialog) => {
    const text = dialog.message();
    console.log(text);
    expect(dialog.message()).toBe("Please fill out Username and Password.");
    await dialog.accept();
  });
  await page.click("a#signin2");
  await page.click('button[onclick="register()"]');
});

test("Verify that register process test with existing credentials shown popup error", async ({
  page,
}) => {
  page.on("dialog", async (dialog) => {
    const text = dialog.message();
    console.log(text);
    expect(dialog.message()).toBe("This user already exist.");
    await dialog.accept();
  });
  await page.goto("https://www.demoblaze.com/");
  await page.click("a#signin2");
  const username1 = "tihana";
  const password1 = "123456";
  await page.fill('input[id="sign-username"]', username1);
  await page.fill('input[id="sign-password"]', password1);
  await page.screenshot({ path: "1.png" });
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
  await console.log(username + username);
  await console.log(password);
  await page.fill('input[id="sign-username"]', username + username);
  await page.fill('input[id="sign-password"]', password);
  await page.screenshot({ path: "UserAndPassForRegister.png" });
  const buttonSign = page.locator("button[onclick='register()']");
  await page.screenshot({ path: "Register.png" });
  await buttonSign.click();
  await page.click("a#login2");
  await page.fill('input[id="loginusername"]', username + username);
  await page.fill('input[id="loginpassword"]', password);
  await page.screenshot({ path: "UserAndPassLogin.png" });
  await page.click('button[onclick="logIn()"]');
  await expect(page.locator("a#nameofuser")).toContainText(
    "Welcome " + username + username
  );
  await page.screenshot({ path: "welcomeUsername.png" });
});
