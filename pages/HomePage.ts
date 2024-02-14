import { Page, Locator, expect } from "@playwright/test";



class HomePage {
  readonly page: Page;
  readonly homePageElement: Locator;
  readonly categoriesHeadline: Locator;
  readonly phonesCategory: Locator;
  readonly laptopsCategory: Locator;
  readonly monitorsCategory: Locator;
  readonly nextButton1: Locator;
  readonly previousButton1: Locator;
  readonly nextButton: Locator;
  readonly previousButton: Locator;
  readonly categoriesGrid: Locator;
  readonly productLinks: Locator;
  readonly closeButtonInPopup: Locator;

  readonly productTitles: Locator;
  readonly homeLink: Locator;
  //products
  readonly productNokia: Locator;
  readonly productSamsungS6: Locator;
  readonly productAppleMonitor: Locator;
  readonly productMcBookAir: Locator;
  readonly productSamsungS7: Locator;
  readonly someImageOnSlide: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePageElement = page.getByText("Home");
    this.categoriesHeadline = page.locator("text=CATEGORIES");
    this.phonesCategory = page.getByRole("link", { name: "Phones" });
    this.laptopsCategory = page.getByRole("link", { name: "Laptops" });
    this.monitorsCategory = page.getByRole("link", { name: "Monitors" });
    this.nextButton1 = page.locator('button[id="next2"]');
    this.previousButton1 = page.locator('button[id="prev2"]');
    this.productTitles = page.locator(".card-title a");
    this.nextButton = page.locator("span.sr-only", { hasText: "Next" });
    this.previousButton = page.locator("span.sr-only", { hasText: "Previous" });
    this.categoriesGrid = page.locator("div.some-grid-or-class-name");
    this.productLinks = page.locator("a.hrefch");
    this.closeButtonInPopup = page.locator(".modal-footer >> text=Close");
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.productNokia = page.locator(`a.hrefch`, {
      hasText: "Nokia lumia 1520",
    });
    this.productSamsungS6 = page.locator(`a.hrefch`, {
      hasText: "Samsung galaxy s6",
    });
    this.productAppleMonitor = page.locator(`a.hrefch`, {
      hasText: "Apple monitor 24",
    });
    this.productMcBookAir = page.locator(`a.hrefch`, {
      hasText: "MacBook air",
    });
    this.productSamsungS7 = page.locator(`a.hrefch`, {
      hasText: "Samsung galaxy s7",
    });

    this.someImageOnSlide = page.locator('.carousel img[src$=".jpg"]');
  }

  async goTo() {
    await this.page.goto("https://www.demoblaze.com/", {
      waitUntil: "networkidle",
    });
  }

  async goToHomeNav() {
    await this.homeLink.click();
  }
  async verifyCurrentURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async verifyWebPageTitle(expectedText: string) {
    await expect(this.page).toHaveTitle(expectedText);
  }


 async  verifyNextAndPreviousButton(
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

  async verifyNextButton() {
    const expectedSlides = [
      { src: "Samsung1.jpg", alt: "First slide" },
      { src: "nexus1.jpg", alt: "Second slide" },
      { src: "iphone1.jpg", alt: "Third slide" },
    ];

    await this.verifyNextAndPreviousButton(
      this.page,
      this.nextButton,
      expectedSlides
    );
  }
  async verifyPreviousButton() {
    const expectedSlides = [
      { src: "Samsung1.jpg", alt: "First slide" },
      { src: "iphone1.jpg", alt: "Third slide" },
      { src: "nexus1.jpg", alt: "Second slide" },
    ];
    await this.verifyNextAndPreviousButton(
      this.page,
      this.previousButton,
      expectedSlides
    );
  }

  async verifyNextButton1() {
    const images = this.page.locator('.carousel img[src$=".jpg"]');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toBeVisible();
      await this.nextButton1.click();
    }
  }
  async getProductTitles() {
    await this.productTitles.first().waitFor();
    return this.page.$$eval(".card-title a", (elements) =>
      elements.map((e) => (e.textContent ? e.textContent.trim() : ""))
    );
  }
}

export { HomePage };
