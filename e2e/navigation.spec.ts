import { test, expect } from "@playwright/test";

test.describe("ヘッダーナビゲーション", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Works ボタンで Works 見出しが画面内に入る", async ({ page }) => {
    await page.getByRole("button", { name: "Works" }).click();
    await expect(
      page.getByRole("heading", { name: "Works" })
    ).toBeInViewport({ timeout: 5000 });
  });

  test("Skills ボタンで Skills 見出しが画面内に入る", async ({ page }) => {
    await page.getByRole("button", { name: "Skills" }).click();
    await expect(
      page.getByRole("heading", { name: "Skills" })
    ).toBeInViewport({ timeout: 5000 });
  });

  test("About ボタンで 薮下 海大 テキストが画面内に入る", async ({ page }) => {
    await page.getByRole("button", { name: "About" }).click();
    await expect(page.getByText("薮下 海大")).toBeInViewport({ timeout: 5000 });
  });

  test("Home ボタンで先頭に戻る", async ({ page }) => {
    // まず Works へ移動
    await page.getByRole("button", { name: "Works" }).click();
    await page.waitForTimeout(600);
    // Home に戻る
    await page.getByRole("button", { name: "Home" }).click();
    await expect(page.locator("section").first()).toBeInViewport({ timeout: 5000 });
  });
});
