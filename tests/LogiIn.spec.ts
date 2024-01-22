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

test("Verify Login without any creds", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    const text = dialog.message();
    console.log(text);
    expect(dialog.message()).toBe("Please fill out Username and Password.");
    await dialog.accept();
  });
  await page.goto("https://www.demoblaze.com/  ");
  await page.click("a#login2");
  await page.click('button[onclick="logIn()"]');
});
test("Login process test with valid credentials", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  await page.click("a#login2");
  const username1 = "tihana";
  const password1 = "123456";
  await page.fill('input[id="loginusername"]', username1);
  await page.fill('input[id="loginpassword"]', password1);
  await page.click('button[onclick="logIn()"]');
  await expect(page.locator("a#nameofuser")).toContainText("Welcome tihana");
});
