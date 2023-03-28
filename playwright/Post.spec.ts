import { test, expect } from "@playwright/test";

test("add post", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Posts" }).click();
  await page.getByPlaceholder("Title").click();
  await page.getByPlaceholder("Title").fill("this is a post title");
  await page
    .getByPlaceholder("Type your message")
    .fill("this is a post message");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("this is a post titlethis is a post messageCommentsAuthor")
  ).toContainText("this is a post title");
  await expect(
    page.getByText("this is a post titlethis is a post messageCommentsAuthor")
  ).toContainText("this is a post message");
});
