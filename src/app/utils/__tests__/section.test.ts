import { describe, test, expect } from "vitest";
import { getSectionFromScroll } from "../section";

describe("getSectionFromScroll", () => {
  const h = 800;

  test("最上部（scrollY=0）は intro セクション", () => {
    expect(getSectionFromScroll(0, h)).toBe("intro");
  });

  test("1画面分スクロールで works セクション", () => {
    expect(getSectionFromScroll(800, h)).toBe("works");
  });

  test("2画面分スクロールで skills セクション", () => {
    expect(getSectionFromScroll(1600, h)).toBe("skills");
  });

  test("3画面分スクロールで about セクション", () => {
    expect(getSectionFromScroll(2400, h)).toBe("about");
  });

  test("セクション数を超えるスクロール値でも about に収まる", () => {
    expect(getSectionFromScroll(99999, h)).toBe("about");
  });

  test("各セクション境界の直前は前のセクション", () => {
    // scrollY=799, center=799+400=1199, idx=1 → works
    expect(getSectionFromScroll(799, h)).toBe("works");
  });
});
