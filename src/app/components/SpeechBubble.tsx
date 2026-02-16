'use client';

import { useEffect, useRef, useState } from 'react';

interface SpeechBubbleProps {
  text: string;
  visible: boolean;
  onComplete?: () => void;
}

export default function SpeechBubble({
  text,
  visible,
  onComplete,
}: SpeechBubbleProps) {
  const [displayText, setDisplayText] = useState('');

  const indexRef = useRef(0);
  const typingTimerRef = useRef<number | null>(null);
  const completeTimerRef = useRef<number | null>(null);
  const activeTextRef = useRef<string>(''); // ★ 今処理中のtextを固定

  // -------------------------
  // 全タイマー強制クリア
  // -------------------------
  const clearAllTimers = () => {
    if (typingTimerRef.current !== null) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    if (completeTimerRef.current !== null) {
      clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }
  };

  // -------------------------
  // text / visible 変更時
  // -------------------------
  useEffect(() => {
    clearAllTimers();

    if (!visible || !text) {
      setDisplayText('');
      indexRef.current = 0;
      activeTextRef.current = '';
      return;
    }

    // ★ 今回処理する text を固定
    activeTextRef.current = text;
    setDisplayText('');
    indexRef.current = 0;

    const typeNext = () => {
      // 割り込みガード
      if (!visible) return;
      if (activeTextRef.current !== text) return;

      const currentText = activeTextRef.current;
      const i = indexRef.current;

      // ★ undefined 防止（最重要）
      if (i >= currentText.length) {
        // typing 完了
        if (onComplete) {
          completeTimerRef.current = window.setTimeout(() => {
            onComplete();
          }, 5000);
        }
        return;
      }

      const char = currentText[i];
      if (char === undefined) return;

      setDisplayText(prev => prev + char);
      indexRef.current += 1;

      typingTimerRef.current = window.setTimeout(typeNext, 50);
    };

    typingTimerRef.current = window.setTimeout(typeNext, 50);

    return () => {
      clearAllTimers();
    };
  }, [text, visible, onComplete]);

  if (!visible) return null;

  return (
    <div className="hidden lg:block fixed bottom-[360px] right-8 z-40 max-w-[20rem]">
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-2 relative animate-fade-in">
        <div className="absolute -bottom-2 right-12 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/90" />
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
          {displayText}
          {displayText.length < text.length && (
            <span className="inline-block w-2 h-5 bg-zunda-primary ml-1 animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}