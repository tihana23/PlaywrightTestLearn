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

test('Verify that About us page have title and close button(video is not working)"', async ({
  page,
}) => {
  await page.goto("https://www.demoblaze.com/");
  const aboutUsLink = page.locator("a.nav-link", { hasText: "About us" });
  await aboutUsLink.click();
  const video = page.locator("#videoModalLabel");
  await expect(video).toBeVisible();
  const closeButton = page.locator(
    "#videoModal .modal-footer >> button.btn.btn-secondary",
    { hasText: "Close" }
  );
  await expect(closeButton).toBeVisible();
});
