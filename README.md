ICS MEDIA『[簡単で効果大！Three.jsのポストプロセスで映える3D表現](https://ics.media/entry/251113/)』のサンプルコードです。

以下のURLからデモを確認できます。

https://ics-creative.github.io/251113_three-postprocessing/

## 機能

- 海、島、雲のある3Dシーン
- 4種類のポストプロセスエフェクト
  - Chromatic Aberration（色収差）
  - Bloom（グロー効果）
  - Pixelation（ピクセル化）
  - Sepia（セピア調）
- GUIコントロールによるエフェクト切り替え

## 技術スタック

- Three.js v0.180.0 (WebGPU)
- Vite
- TypeScript
- lil-gui

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

## 開発コマンド

```bash
# ビルド
npm run build

# プレビュー
npm run preview

# 型チェック + Lint + Format
npm run fix
```

## ライセンス

MIT

