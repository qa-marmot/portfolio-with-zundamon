import { test, expect } from "@playwright/test";

test.describe("ページ初期表示", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("ページタイトルが表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test("ヘッダーのナビボタンが4つ存在する", async ({ page }) => {
    // ナビは <button> 要素（<a> リンクではない）
    // 最初のタブは「Home」（Intro ではない）
    await expect(page.getByRole("button", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Works" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("button", { name: "About" })).toBeVisible();
  });

  test("intro の吹き出しが表示される", async ({ page }) => {
    // タイピングアニメーション（50ms/文字）で描画されるため待機
    await expect(
      page.locator("p").filter({ hasText: "こんにちはなのだ" })
    ).toBeVisible({ timeout: 10000 });
  });

  test("音声トグルボタンが表示される", async ({ page }) => {
    // VoiceToggle の aria-label は「音声をオンにする」または「音声をオフにする」
    const voiceBtn = page.getByRole("button", { name: /音声を/ });
    await expect(voiceBtn).toBeVisible();
  });
});
