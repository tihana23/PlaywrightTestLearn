import { expect, Page, Dialog, Locator } from "@playwright/test";

export async function popuUpMessage(
  page: Page,
  expectedMessage: string,
  responseAction: (dialog: Dialog) => Promise<void>
) {
  page.on("dialog", async (dialog) => {
    const text = dialog.message();
    expect(text).toBe(expectedMessage);
    await responseAction(dialog);
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