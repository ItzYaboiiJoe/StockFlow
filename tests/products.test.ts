import { test, expect } from "@playwright/test";
import { SITE_URL } from "../src/lib/constants";

test("products workflow", async ({ page }) => {
  // Login
  await page.goto("/login");

  await page.getByLabel("Email").fill(process.env.TEST_USER_EMAIL!);
  await page.getByLabel("Password").fill(process.env.TEST_USER_PASSWORD!);

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL(`${SITE_URL}/dashboard`);

  // Go to products page
  await page.goto("/products");

  await expect(page).toHaveURL(`${SITE_URL}/products`);

  // Add a new product
  await page.getByRole("button", { name: "Add Product" }).first().click();

  await expect(page.locator("body")).toContainText(
    "Add a new product to your inventory.",
  );

  await page.getByLabel("Product Name").fill("Test Product");
  await page.getByLabel("Description").fill("This is a test product.");
  await page.getByLabel("Category").fill("This is a test product.");
  await page.getByLabel("Variant Name").fill("This is a test product.");
  await page.getByLabel("SKU").fill("This is a test product.");
  await page.getByRole("spinbutton", { name: "Price" }).fill("10");
  await page.getByRole("spinbutton", { name: "Cost" }).fill("5");
  await page.getByRole("spinbutton", { name: "Low Stock Threshold" }).fill("3");

  await page.getByRole("button", { name: "Add Product" }).click();

  await expect(page.locator("body")).toContainText("Test Product");

  // Edit Product
  await page
    .getByRole("link", { name: "Test Product", exact: true })
    .first()
    .click();

  await expect(
    page.getByRole("heading", { name: "Test Product" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Edit Product" }).click();

  await page
    .getByRole("textbox", { name: "Product Name" })
    .fill("Test Product Updated.");
  await page
    .getByRole("textbox", { name: "Description" })
    .fill("This is a test product Updated.");
  await page
    .getByRole("textbox", { name: "Category" })
    .fill("This is a test product Updated.");

  await page.getByRole("switch").click();

  await page.getByRole("button", { name: "Save Changes" }).click();

  await expect(
    page.getByRole("heading", { name: "Test Product Updated." }),
  ).toBeVisible();

  // Delete Variant
  await page.getByRole("button", { name: "⋮" }).first().click();
  await page.getByRole("menuitem", { name: "Delete Variant" }).click();

  await page.getByRole("button", { name: "Delete" }).click();

  await expect(page.getByText("No variants available")).toBeVisible();

  // Add Variant
  await page.getByRole("button", { name: "Add Variant" }).first().click();

  await page.getByLabel("Variant Name").fill("This is a test product.");
  await page.getByLabel("SKU").fill("This is a test product sku.");
  await page.getByRole("spinbutton", { name: "Price" }).fill("10");
  await page.getByRole("spinbutton", { name: "Cost" }).fill("5");
  await page.getByRole("spinbutton", { name: "Low Stock Threshold" }).fill("3");

  await page.getByRole("button", { name: "Add Variant" }).click();

  await expect(
    page.getByRole("cell", { name: "This is a test product." }),
  ).toBeVisible();

  // Edit Variant
  await page.getByRole("button", { name: "⋮" }).first().click();
  await page.getByRole("menuitem", { name: "Edit Variant" }).click();

  await expect(page.getByText("Edit the product variant.")).toBeVisible();

  await page
    .getByRole("textbox", { name: "Variant Name" })
    .fill("This is a test product Updated.");
  await page
    .getByRole("textbox", { name: "SKU" })
    .fill("This is a test product sku Updated.");
  await page.getByRole("spinbutton", { name: "Price" }).fill("15");
  await page.getByRole("spinbutton", { name: "Cost" }).fill("7");
  await page.getByRole("spinbutton", { name: "Low Stock Threshold" }).fill("5");
  await page.getByRole("switch").click();

  await page.getByRole("button", { name: "Save Changes" }).click();

  await expect(page.getByRole("cell", { name: "Inactive" })).toBeVisible();

  // Delete Product
  await page.getByRole("button", { name: "Delete Product" }).click();

  await expect(page.getByText("Are you sure?")).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();

  await expect(page).toHaveURL(`${SITE_URL}/products`);
  await expect(page.getByText("No products yet")).toBeVisible();
});
