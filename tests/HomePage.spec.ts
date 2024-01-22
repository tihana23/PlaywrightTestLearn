import { faker } from '@faker-js/faker';
import { test, expect, chromium, Browser, BrowserContext, Page, Dialog } from '@playwright/test';
const username = faker.person.firstName();
const password = faker.person.lastName();

test('Verify that webpage has title', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("STORE");
});

test('Verify that homepage load test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


  const homePageElement = page.getByText('Home');

  await expect(homePageElement).toBeVisible();
});

test('Verify that categories text is displyed', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


  const phonesCategory = page.locator('text=CATEGORIES');
  await expect(phonesCategory).toBeVisible();
});

test('Verify that Phone Laptop Minitors categories are displayed', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


  const phonesCategory = page.locator('text=Phones');
  await expect(phonesCategory).toBeVisible();


  const laptopsCategory = page.locator('text=Laptops');
  await expect(laptopsCategory).toBeVisible();


  const monitorsCategory = page.locator('text=Monitors');
  await expect(monitorsCategory).toBeVisible();
});

test('Verify that contact page is open correctly', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


});
test('Verify that contact can be filled correctly', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


});
test('Verify that About us can be oppened correctly', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


});
test('Verify that About us video can play correctly', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


});
test('Verify that Chart page is oppened correctly', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');


});
test('Verify Login without any creds', async () => {
  const browser: Browser = await chromium.launch({headless: false});
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();
  page.on('dialog', async (dialog) => {
    const text = dialog.message();
console.log(text);
expect(dialog.message()).toBe('Please fill out Username and Password.');
    await dialog.accept();
});
  await page.goto('https://www.demoblaze.com/');
  await page.click('a#login2');
  await page.click('button[onclick="logIn()"]'); 

  await browser.close();
});

test('Register process test with valid credentials--nije dobro', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
    console.log("lalalla");
    page.on('dialog', async (dialog) => {
      const text = dialog.message();
  console.log(text);
  expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
  });   
  await page.click('a#signin2');
  
  await console.log(username);
  await console.log(password);
  await page.fill('input[id="sign-username"]', username);
  await page.fill('input[id="sign-password"]', password);
  await page.click('button[onclick="register()"]');

});

test('Register process and login with inserted data', async () => {
  const browser: Browser = await chromium.launch({ headless: false });
      const context: BrowserContext = await browser.newContext();
      const page: Page = await context.newPage();
  await page.goto('https://www.demoblaze.com/');
  await page.click('a#signin2');
  await console.log(username);
  await console.log(password);
  await page.fill('input[id="sign-username"]', username);
  await page.fill('input[id="sign-password"]', password);
  const buttonSign = page.locator("button[onclick='register()']")
  await buttonSign.click();
  await page.click('a#login2');
  await page.fill('input[id="loginusername"]', username);
  await page.fill('input[id="loginpassword"]', password);
  await page.click('button[onclick="logIn()"]');
  await expect(page.locator('a#nameofuser')).toContainText('Welcome '+username);
});

test('Login process test with valid credentials', async () => {
      const browser: Browser = await chromium.launch({ headless: false });
      const context: BrowserContext = await browser.newContext();
      const page: Page = await context.newPage();
    
      await page.goto('https://www.demoblaze.com/');
    
    
      await page.click('a#login2');
      const username1 = "tihana";
      const password1 = "123456";
      await page.fill('input[id="loginusername"]', username1);
      await page.fill('input[id="loginpassword"]', password1);
      await page.click('button[onclick="logIn()"]');
      await expect(page.locator('a#nameofuser')).toContainText('Welcome tihana');
    
    });