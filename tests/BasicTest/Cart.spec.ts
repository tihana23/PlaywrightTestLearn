import { faker } from "@faker-js/faker";
import { test, expect} from "@playwright/test";
import {
  popuUpMessage,
  addProductToCart,
  getPriceFromCart,
  addItemToCartAndVerify,
} from "../../ReusableMethod/Methods";
test("Verify that one item from home page can be selected and visible on the char page", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  await addItemToCartAndVerify(page, "CATEGORIES", "Samsung galaxy s6");
});
test("Verify that one item from home page can be selected and visible on the char page and deleted", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  await addItemToCartAndVerify(page, "CATEGORIES", "Samsung galaxy s6");
  const deleteButton = "text=Delete";
  await page.click(deleteButton);
  const laptopChar = page.getByText("Samsung galaxy s6");
  await expect(laptopChar).toBeHidden();
});

test("Verify that one item from home page and Phone categories can be selected and visible on the char page and deleted", async ({page}) => {
  

  await page.goto("https://www.demoblaze.com/");
  await addItemToCartAndVerify(page, "Phones", "Samsung galaxy s6");
  const deleteButton = "text=Delete";
  await page.click(deleteButton);
  const laptopChar = page.getByText("Samsung galaxy s6");
  await expect(laptopChar).toBeHidden();
});
test("Verify that one item from home page and Laptops categories can be selected and visible on the char page and deleted", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  await addItemToCartAndVerify(page, "Laptops", "Sony vaio i5");
  const deleteButton = "text=Delete";
  await page.click(deleteButton);
  const laptopChar = page.getByText("Sony vaio i5");
  await expect(laptopChar).toBeHidden();
});

test("Verify that one item from home page and Monitors categories can be selected and visible on the char page and deleted", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  await addItemToCartAndVerify(page, "Monitors", "Apple monitor 24");
  const deleteButton = "text=Delete";
  await page.click(deleteButton);
  const laptopChar = page.getByText("Apple monitor 24");
  await expect(laptopChar).toBeHidden();
});

test("Verify total in cart is calculated correctly", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  await addProductToCart(page, "Samsung galaxy s6");
  await addProductToCart(page, "Nokia lumia 1520");
  await page.click("#cartur", { timeout: 10000 });
  const priceSamsung = await getPriceFromCart(page, "Samsung galaxy s6");
  const priceNokia = await getPriceFromCart(page, "Nokia lumia 1520");
  const expectedTotal = priceSamsung + priceNokia;
  const totalText = await page.textContent("#totalp");
  const actualTotal = totalText ? parseFloat(totalText) : 0;
  expect(expectedTotal).toBe(actualTotal);
});
test("Verify that Place order is working correcly..not so much but...", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  await addProductToCart(page, "Samsung galaxy s6");

  await addProductToCart(page, "Nokia lumia 1520");
  await page.waitForEvent("load");
  await page.click("#cartur", { timeout: 10000 });
  const priceSamsung = await getPriceFromCart(page, "Samsung galaxy s6");
  const priceNokia = await getPriceFromCart(page, "Nokia lumia 1520");
  const expectedTotal = priceSamsung + priceNokia;
  const totalText = await page.textContent("#totalp");
  const actualTotal = totalText ? parseFloat(totalText) : 0;
  expect.soft(expectedTotal).toBe(actualTotal);
  const buttonPlaceOrder = page.locator('button:has-text("Place Order")');
  await buttonPlaceOrder.click();
  const placeOrderNameTextbox = page.locator("#name");
  const placeOrderCountryTextbox = page.locator("#country");
  const placeOrderCityTextbox = page.locator("#city");
  const placeOrderCreditCardTextbox = page.locator("#card");
  const placeOrderMonthTextbox = page.locator("#month");
  const placeOrderYearTextbox = page.locator("#year");
  const firstNameUsed = faker.person.firstName();
  await placeOrderNameTextbox.fill(firstNameUsed);
  await placeOrderCountryTextbox.fill(faker.location.country());
  await placeOrderCityTextbox.fill(faker.location.city());
  await placeOrderCreditCardTextbox.fill(faker.finance.creditCardNumber());
  await placeOrderMonthTextbox.fill(faker.date.month());
  await placeOrderYearTextbox.fill(faker.date.month());
  const buttonPurchase = page.locator('button[onclick="purchaseOrder()"]');
  await buttonPurchase.click({ timeout: 10000 });
  const thankYouMessageLocator = page.locator(
    'h2:has-text("Thank you for your purchase!")'
  );
  const amountPopup = page.locator("p.lead.text-muted");
  const namePopup = page.locator("p.lead.text-muted >> text=/Name: .+/");
  const tyMessageExpected = "Thank you for your purchase!";
  const thankYouMessageTextActual = await thankYouMessageLocator.textContent({
    timeout: 30000,
  });
  expect(tyMessageExpected).toEqual(thankYouMessageTextActual);
  const amountText = await amountPopup.textContent({ timeout: 30000 });
  // Initialize a variable to hold the parsed amount
  let amount = 0;
  if (amountText !== null) {
    const amountMatch = amountText.match(/Amount: (\d+) USD/);
    if (amountMatch) {
      amount = parseFloat(amountMatch[1]);
    }
  }

  const nameText = await namePopup.textContent();
  let name = "";

  if (nameText !== null) {
    const nameMatch = nameText.match(/Name: (.+?)(?=Date)/);
    if (nameMatch) {
      name = nameMatch[1].trim();
    }
  }

  expect(actualTotal).toBe(amount);
  expect(firstNameUsed).toBe(name);
});

test("Verify that popup window appeared if data is not populated", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });
  await addProductToCart(page, "Samsung galaxy s6");
  await addProductToCart(page, "Nokia lumia 1520");
  await page.click("#cartur");
  const buttonPlaceOrder = page.locator('button:has-text("Place Order")');
  await buttonPlaceOrder.click();
  await popuUpMessage(page, "Please fill out Name and Creditcard.");
  const buttonPurchase = page.locator('button[onclick="purchaseOrder()"]');
  await page.waitForTimeout(5000);
  await buttonPurchase.click();
});
test("Verify that Close button inside place order working and Place order window is closed", async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/", { waitUntil: "networkidle" });

  await page.click("#cartur");
  const buttonPlaceOrder = page.locator('button:has-text("Place Order")');
  await buttonPlaceOrder.click();
  await expect(
    page.locator('div.modal-header:has-text("Place order")')
  ).toBeVisible();
  const closeButtonLocator = page.locator(
    "xpath=/html/body/div[3]/div/div/div[3]/button[1]"
  );
  await closeButtonLocator.click();
  await expect(
    page.locator('div.modal-header:has-text("Place order")')
  ).not.toBeVisible();
});


