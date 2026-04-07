import { test, expect } from "@playwright/test";

test.describe("About セクション", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "About" }).click();
    await page.getByText("薮下 海大").waitFor({ state: "visible" });
  });

  test("GitHub リンクが存在し _blank で開く", async ({ page }) => {
    const githubLink = page.getByRole("link", { name: /GitHub/i });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("Qiita リンクが存在し _blank で開く", async ({ page }) => {
    const qiitaLink = page.getByRole("link", { name: /Qiita/i });
    await expect(qiitaLink).toBeVisible();
    await expect(qiitaLink).toHaveAttribute("target", "_blank");
  });

  test("プロフィール名が表示される", async ({ page }) => {
    await expect(page.getByText("薮下 海大")).toBeVisible();
  });

  test("QA&Web Engineer の肩書きが表示される", async ({ page }) => {
    await expect(page.getByText("QA&Web Engineer")).toBeVisible();
  });
});
