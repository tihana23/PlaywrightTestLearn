import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { popuUpMessage } from "../../ReusableMethod/Methods";
import { ProductPage } from "../../pages/ProductPage";

test("Verify that Product page have all fields visible", async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  await homePage.goTo();
  await homePage.navigateToPhonesCategory();
  await homePage.selectProduct("Samsung galaxy s6");
  await productPage.verifyProductIsOpenAndAllFielsAreVisible(
    "Samsung galaxy s6"
  );
});

test("Verify that Add to cart button is working and show popup message", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  await homePage.goTo();
  await homePage.navigateToPhonesCategory();
  await homePage.selectProduct("Samsung galaxy s6");
  await popuUpMessage(page, "Product added");
  await productPage.addProductToCart();
});
