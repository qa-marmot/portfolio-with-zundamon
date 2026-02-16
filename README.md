# ずんだもんポートフォリオサイト

Live2Dキャラクター「ずんだもん」が常駐するインタラクティブなポートフォリオサイトです。

## 特徴

- **Live2D統合**: pixi.js + pixi-live2d-displayを使用した高品質なLive2D表示
- **インタラクティブ**: セクション遷移やクリックに応じてずんだもんが反応
- **音声対応**: VOICEVOX APIと連携した音声合成（オプション）
- **レスポンシブデザイン**: モバイルからデスクトップまで対応
- **モダンスタック**: Next.js 14 (App Router) + TypeScript + Tailwind CSS

## セットアップ

### 依存関係のインストール

```bash
npm install
```

### VOICEVOX

ローカルで音声機能を使用する場合は、VOICEVOXをインストールして起動してください。

1. [VOICEVOX](https://voicevox.hiroshiba.jp/)をダウンロード
2. アプリケーションを起動
3. デフォルトではlocalhost:50021で起動します

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。


## カスタマイズ

### セクションの内容を変更

`src/app/components/Sections/` 内の各ファイルを編集してください。

### ずんだもんの台詞を変更

`src/app/page.tsx` の `sectionDialogues` オブジェクトを編集してください。

### Live2Dパラメータの調整

`src/app/components/Live2DCharacter.tsx` でモデルの表示サイズや位置を調整できます。

## 🔧 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Live2D**: pixi.js + pixi-live2d-display
- **Voice**: VOICEVOX API (オプション)
