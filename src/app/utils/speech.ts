/**
 * Works カードクリック時の吹き出しテキストを生成する
 */
export function buildWorkSpeechText(work: {
  title: string;
  description: string;
}): string {
  return `${work.title}なのだ！\n${work.description}`;
}
