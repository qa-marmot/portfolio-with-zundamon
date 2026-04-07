import { test, expect } from "@playwright/test";

test.describe("Skills セクション", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Skills" }).click();
    await page.getByRole("heading", { name: "Skills" }).waitFor({ state: "visible" });
  });

  test("Skills 見出しが表示される", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
  });

  test("Frontend カードが表示される", async ({ page }) => {
    await expect(page.getByText("Frontend")).toBeVisible();
  });

  test("Frontend カードをクリックすると吹き出しにフロントエンドの説明が出る", async ({ page }) => {
    // Frontend カードの見出しの親（カード本体）をクリック
    await page.getByText("Frontend").first().click();
    const bubble = page.locator("p").filter({ hasText: "フロントエンドなのだ" });
    await expect(bubble).toBeVisible({ timeout: 8000 });
  });

  test("次へボタンで Backend カードに遷移する", async ({ page }) => {
    await page.getByRole("button", { name: "次へ" }).first().click();
    await expect(page.getByText("Backend")).toBeVisible();
  });

  test("Skills セクションのインジケータードットが3つ表示される", async ({ page }) => {
    const skillsSection = page
      .locator("section")
      .filter({ has: page.getByRole("heading", { name: "Skills" }) });
    const indicators = skillsSection.getByRole("button", { name: /スライド \d+ へ移動/ });
    await expect(indicators).toHaveCount(3);
  });

  test("Frontend のスキルタグが表示される", async ({ page }) => {
    // 複数セクションに同名タグがあるので .first() で先頭のみ対象にする
    await expect(page.getByText("TypeScript").first()).toBeVisible();
    await expect(page.getByText("React").first()).toBeVisible();
  });
});
