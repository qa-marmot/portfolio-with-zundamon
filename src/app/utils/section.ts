export type Section = "intro" | "works" | "skills" | "about";

export const SECTIONS: Section[] = ["intro", "works", "skills", "about"];

/**
 * スクロール位置から現在のセクションを特定する。
 * 画面中央がどのセクション高さに属するかで判定する。
 */
export function getSectionFromScroll(scrollY: number, innerHeight: number): Section {
  const center = scrollY + innerHeight / 2;
  const idx = Math.floor(center / innerHeight);
  return SECTIONS[Math.min(idx, SECTIONS.length - 1)];
}
