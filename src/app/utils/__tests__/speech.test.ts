import { describe, test, expect } from "vitest";
import { buildWorkSpeechText } from "../speech";

describe("buildWorkSpeechText", () => {
  test("タイトル + 説明を「なのだ！」でつなぐ", () => {
    const result = buildWorkSpeechText({
      title: "JavaScript勉強サイト",
      description: "Next.js × TailwindCSSで作成",
    });
    expect(result).toBe("JavaScript勉強サイトなのだ！\nNext.js × TailwindCSSで作成");
  });

  test("タイトルの後ろに「なのだ！」が含まれる", () => {
    const result = buildWorkSpeechText({
      title: "カタカナーシ",
      description: "WebSocketを使ったゲーム",
    });
    expect(result).toContain("なのだ！");
  });

  test("改行で区切られている", () => {
    const result = buildWorkSpeechText({ title: "A", description: "B" });
    expect(result).toContain("\n");
  });
});
