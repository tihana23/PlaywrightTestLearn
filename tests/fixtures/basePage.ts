import { test as baseTest } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { CartPage } from "../../pages/CartPage";
import { ContactPage } from "../../pages/ContactPage";
import { ProductPage } from "../../pages/ProductPage";
import { AboutUsPage } from "../../pages/AboutUsPage";
import { NavigationBarPage } from "../../pages/NavigationBarPage";

// Extend base test with page model fixtures
export const test = baseTest.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  cartPage: CartPage;
  contactPage: ContactPage;
  productPage: ProductPage;
  aboutUsPage: AboutUsPage;
  navigationBarPage: NavigationBarPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  aboutUsPage: async ({ page }, use) => {
    await use(new AboutUsPage(page));
  },
  navigationBarPage: async ({ page }, use) => {
    await use(new NavigationBarPage(page));
  },
  
});

export const { expect } = test;