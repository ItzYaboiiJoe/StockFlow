import { test, expect } from "@playwright/test";
import { SITE_URL } from "../src/lib/constants";

test("products workflow", async ({ page }) => {
  await page.goto("/login");

  await page.getByLabel("Email").fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD!);

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL(`${SITE_URL}/dashboard`);

  await page.goto("/products");

  await expect(page).toHaveURL(`${SITE_URL}/products`);
});
