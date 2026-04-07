/**
 * カルーセルの「前へ」インデックスを返す（先頭から前へ → 末尾にループ）
 */
export function getPrevIndex(current: number, total: number): number {
  return current > 0 ? current - 1 : total - 1;
}

/**
 * カルーセルの「次へ」インデックスを返す（末尾から次へ → 先頭にループ）
 */
export function getNextIndex(current: number, total: number): number {
  return current < total - 1 ? current + 1 : 0;
}
