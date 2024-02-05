import { expect, Page, Dialog, Locator } from "@playwright/test";
import { NavigationBar } from "../pages/NavigationBar";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { AboutUsPage } from "../pages/AboutUsPage";

export async function popuUpMessage(page, expectedMessage: string) {
  page.once("dialog", async (dialog: Dialog) => {
    const text = dialog.message();
    expect(text).toBe(expectedMessage);
    await dialog.accept(); // Standard response action, e.g., accepting the dialog
  });
}
export async function addProductToCart(
  page: Page,
  productName: string
): Promise<void> {
  await page.click(`.card-title a:has-text("${productName}")`);
  const linkAddCart = page.getByText("Add to cart");
  await linkAddCart.click({ force: true });
  //await page.waitForTimeout(1000);
  await page.click("a.navbar-brand#nava");
}

export async function getPriceFromCart(
  page: Page,
  productName: string
): Promise<number> {
  //await page.waitForTimeout(1000);
  const productRow = page.locator(`tr.success:has-text("${productName}")`);
  const priceText = await productRow.locator("td:nth-child(3)").textContent();
  if (priceText !== null) {
    return parseFloat(priceText);
  } else {
    // console.error(`Price not found for ${productName}`);
    return 0;
  }
}

export async function verifyNextAndPreviousButton(
  page: Page,
  buttonSelector: Locator,
  expectedSlides: Array<{ src: string; alt: string }>
): Promise<void> {
  for (const { src, alt } of expectedSlides) {
    const activeImageSelector =
      "div.carousel-item.active img.d-block.img-fluid";
    const image = page.locator(activeImageSelector);

    await expect(image).toHaveAttribute("src", src);
    await expect(image).toHaveAttribute("alt", alt);
    // console.log(`Slide Source: ${src}, Alt Text: ${alt}`);

    // Click the button to move to the next/previous slide
    await buttonSelector.click();
    // Adjust timeout as needed for slide transition
    await page.waitForTimeout(1000);
  }
}
export async function scrollFullPage(page) {
  await this.page.evaluate(async () => {
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i);
    }
  });
}

export async function addItemToCartWithCategoryAndVerify(
  page,
  category: string,
  itemName: string
) {
  const choosedCategory = `text=${category}`;
  await page.click(choosedCategory);
  const itemNames = `a:has-text("${itemName}")`;
  await page.click(itemNames);
  const visibleItemInProductPage = page.locator(`h2:has-text("${itemName}")`);
  await expect.soft(visibleItemInProductPage).toBeVisible();
  const adToCartButon = "text=Add to cart";
  await page.click(adToCartButon);
  const cartLink = 'a:has-text("Cart")';
  await page.click(cartLink);
  await expect.soft(page).toHaveURL("https://www.demoblaze.com/cart.html");
  const itemInCarte = page.locator(`:text("${itemName}")`);
  await expect.soft(itemInCarte).toBeVisible();
}
