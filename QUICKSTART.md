# クイックスタートガイド

このガイドに従えば、5分でずんだもんポートフォリオサイトを起動できます！

## 📋 必要なもの

- Node.js 18以上
- npm または yarn

## 🚀 起動手順

### 1. 依存関係のインストール

プロジェクトフォルダで以下のコマンドを実行：

```bash
npm install
```

または

```bash
yarn install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

### 3. ブラウザで確認

ブラウザで以下のURLを開く：

```
http://localhost:3000
```

ずんだもんが画面右下に表示されます！

## 🎤 音声機能を使う場合（オプション）

### VOICEVOXのインストール

1. [VOICEVOX公式サイト](https://voicevox.hiroshiba.jp/)からダウンロード
2. アプリケーションをインストール
3. VOICEVOXを起動（自動的にlocalhost:50021で起動します）
4. ブラウザでポートフォリオサイトを開く
5. 右上の音声アイコンをクリックしてONにする

### 音声機能なしで使う場合

音声アイコンをOFFのままにしておけば、テキストと口パクアニメーションのみで動作します。

## 📝 カスタマイズのヒント

### 個人情報を変更する

1. `src/app/components/Sections/AboutSection.tsx` を開く
2. 名前やプロフィール文を編集

### 作品を追加/変更する

1. `src/app/components/Sections/WorksSection.tsx` を開く
2. `works` 配列を編集

### ずんだもんの台詞を変更する

1. `src/app/page.tsx` を開く
2. `sectionDialogues` オブジェクトの各セクションのテキストを編集

## 🔧 トラブルシューティング

### ずんだもんが表示されない

- ブラウザのコンソールを確認してください
- Live2Dモデルファイルが `public/models/` に正しく配置されているか確認
- Cubism Coreが `public/lib/live2dcubismcore.min.js` にあるか確認

### 音声が再生されない

- VOICEVOXが起動しているか確認
- ブラウザのコンソールでエラーメッセージを確認
- 音声トグルがONになっているか確認
- CORS エラーが出る場合は、VOICEVOXの設定を確認

### ビルドエラーが出る

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

## 🎨 本番環境へのデプロイ

### Vercelにデプロイ

```bash
npm run build
vercel deploy
```

### 静的エクスポート

```bash
# next.config.jsに以下を追加
output: 'export'

# ビルド
npm run build

# outフォルダをサーバーにアップロード
```

注意: 音声機能は本番環境では動作しません（VOICEVOX APIがローカルホストのため）

## 📚 さらに詳しく

詳細なドキュメントは `README.md` を参照してください。

## 💡 ヘルプが必要ですか？

問題が解決しない場合は、GitHubのIssuesでお気軽にご質問ください！
