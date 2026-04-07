import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import SpeechBubble from "../SpeechBubble";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("SpeechBubble", () => {
  test("visible=false のとき何も描画しない", () => {
    const { container } = render(
      <SpeechBubble text="テスト" visible={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("visible=true のとき吹き出しが描画される", async () => {
    render(<SpeechBubble text="テスト" visible={true} />);
    await act(() => vi.advanceTimersByTimeAsync(200));
    expect(document.querySelector("p")).toBeInTheDocument();
  });

  test("タイピング完了後 5秒 で onComplete が呼ばれる", async () => {
    const onComplete = vi.fn();
    render(<SpeechBubble text="A" visible={true} onComplete={onComplete} />);

    // 1文字 × 50ms でタイピング完了 → 5000ms 待機
    await act(() => vi.advanceTimersByTimeAsync(50 + 5000 + 100));
    expect(onComplete).toHaveBeenCalledOnce();
  });

  test("text が変わるとタイピングがリセットされる", async () => {
    const { rerender } = render(
      <SpeechBubble text="最初のテキスト" visible={true} />
    );
    await act(() => vi.advanceTimersByTimeAsync(300));

    rerender(<SpeechBubble text="次のテキスト" visible={true} />);
    await act(() => vi.advanceTimersByTimeAsync(600));

    const p = document.querySelector("p")!;
    expect(p.textContent).not.toContain("最初");
    expect(p.textContent).toContain("次");
  });

  test("visible が false になるとテキストがクリアされ非表示になる", async () => {
    const { rerender } = render(
      <SpeechBubble text="テスト" visible={true} />
    );
    await act(() => vi.advanceTimersByTimeAsync(200));

    rerender(<SpeechBubble text="テスト" visible={false} />);
    expect(document.querySelector("p")).toBeNull();
  });

  test("タイピング中はカーソル（pulse）が表示される", async () => {
    render(<SpeechBubble text="テストテキスト" visible={true} />);
    // タイピング途中（全文字分の時間より短く進める）
    await act(() => vi.advanceTimersByTimeAsync(100));

    const cursor = document.querySelector(".animate-pulse");
    expect(cursor).toBeInTheDocument();
  });
});
