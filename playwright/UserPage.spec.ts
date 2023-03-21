import { test, expect } from "@playwright/test";

test("show/hide posts/photos/comments checkboxes", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "My account" }).click();

  await expect(page.getByRole("heading", { name: "Photos" })).toBeVisible();
  await page.getByRole("checkbox").first().uncheck();
  await expect(page.getByRole("heading", { name: "Photos" })).not.toBeVisible();

  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  await page.getByRole("checkbox").nth(1).uncheck();
  await expect(page.getByRole("heading", { name: "Posts" })).not.toBeVisible();

  await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();
  await page.getByRole("checkbox").nth(2).uncheck();
  await expect(
    page.getByRole("heading", { name: "Comments" })
  ).not.toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Comments" })
  ).not.toBeVisible();
  await page.getByRole("checkbox").nth(2).check();
  await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Posts" })).not.toBeVisible();
  await page.getByRole("checkbox").nth(1).check();
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Photos" })).not.toBeVisible();
  await page.getByRole("checkbox").first().check();
  await expect(page.getByRole("heading", { name: "Photos" })).toBeVisible();
});

test("user edit data", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "My account" }).click();
  await page.getByRole("link", { name: "Edit" }).click();
  await page.getByPlaceholder("Name", { exact: true }).fill("newname123");
  await page.getByPlaceholder("Username").fill("newusername123");
  await page.getByPlaceholder("Email").fill("newemail123@email.com");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("newname123Editnewusername123newemail123@email.com")
  ).toContainText("newname123");
  await expect(
    page.getByText("newname123Editnewusername123newemail123@email.com")
  ).toContainText("newusername123");
  await expect(
    page.getByText("newname123Editnewusername123newemail123@email.com")
  ).toContainText("newemail123@email.com");
});
