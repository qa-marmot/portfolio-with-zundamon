import { describe, test, expect } from "vitest";
import { getPrevIndex, getNextIndex } from "../carousel";

describe("getPrevIndex", () => {
  test("先頭（0）から前へ → 末尾にループ", () => {
    expect(getPrevIndex(0, 5)).toBe(4);
  });

  test("中間から前へ → 通常デクリメント", () => {
    expect(getPrevIndex(3, 5)).toBe(2);
  });

  test("1つ目から前へ → 先頭", () => {
    expect(getPrevIndex(1, 5)).toBe(0);
  });
});

describe("getNextIndex", () => {
  test("末尾から次へ → 先頭にループ", () => {
    expect(getNextIndex(4, 5)).toBe(0);
  });

  test("中間から次へ → 通常インクリメント", () => {
    expect(getNextIndex(2, 5)).toBe(3);
  });

  test("先頭から次へ → 1つ目", () => {
    expect(getNextIndex(0, 5)).toBe(1);
  });
});
