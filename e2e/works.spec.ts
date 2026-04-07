import { test, expect } from "@playwright/test";

test.describe("Works セクション", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // ナビは <button>
    await page.getByRole("button", { name: "Works" }).click();
    await page.getByRole("heading", { name: "Works" }).waitFor({ state: "visible" });
  });

  test("Works 見出しが表示される", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Works" })).toBeVisible();
  });

  test("最初の作品タイトルが表示される", async ({ page }) => {
    await expect(page.getByText("JavaScript勉強サイト")).toBeVisible();
  });

  test("作品カードをクリックすると吹き出しが更新される", async ({ page }) => {
    await page.getByText("JavaScript勉強サイト").click();
    const bubble = page.locator("p").filter({ hasText: "JavaScript勉強サイトなのだ！" });
    await expect(bubble).toBeVisible({ timeout: 8000 });
  });

  test("次へボタンで2枚目のインジケーターがアクティブになる", async ({ page }) => {
    // Works セクション内の次へボタン（先頭のもの）
    const nextBtn = page.getByRole("button", { name: "次へ" }).first();
    await nextBtn.click();
    await page.waitForTimeout(500);

    const secondIndicator = page
      .getByRole("button", { name: "スライド 2 へ移動" })
      .first();
    await expect(secondIndicator).toHaveClass(/w-6|w-8/);
  });

  test("View Project リンクが _blank で開く", async ({ page }) => {
    const viewProjectLink = page.getByRole("link", { name: "View Project" }).first();
    await expect(viewProjectLink).toHaveAttribute("target", "_blank");
    await expect(viewProjectLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("インジケータードットが5つ表示される（作品5件）", async ({ page }) => {
    const indicators = page.getByRole("button", { name: /スライド \d+ へ移動/ }).first().locator("..").getByRole("button");
    // Works セクション内のインジケーターを特定する
    const worksSection = page.locator("section").filter({ has: page.getByRole("heading", { name: "Works" }) });
    const workIndicators = worksSection.getByRole("button", { name: /スライド \d+ へ移動/ });
    await expect(workIndicators).toHaveCount(5);
  });
});
