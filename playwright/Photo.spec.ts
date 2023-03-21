import { test, expect } from "@playwright/test";

test("add photo", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByPlaceholder("Title").click();
  await page.getByPlaceholder("Title").fill("this is a title");
  await page.getByPlaceholder("Title").press("Tab");
  await page
    .getByPlaceholder("Url")
    .fill(
      "https://i.pinimg.com/originals/9d/21/ef/9d21ef4456494477d5897b0145169008.gif"
    );
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText("this is a title")).toHaveText("this is a title");
});
