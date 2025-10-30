# AGENTS.md

このドキュメントは、AIエージェントがこのプロジェクトで作業する際に参照すべき情報をまとめたものです。

## プロジェクト概要

- **プロジェクト名**: three-webgpu
- **フレームワーク**: Vite + Vanilla TypeScript
- **主要ライブラリ**: Three.js (v0.180.0)
- **GUIツール**: leva (v0.10.0)
- **リンター/フォーマッター**: Biome (v2.3.2)

## コーディング規約

### フォーマット設定

- **インデント**: スペース2個
- **セミコロン**: 必須 (always)
- **クォート**: ダブルクォート
- **import整理**: 自動整理が有効

### 禁止事項

- `any`型の使用は絶対に禁止
- 1文字だけの変数名は絶対に禁止（ループ内も含む）
  - ❌ `items.forEach((i) => i.process())`
  - ✅ `items.forEach((item) => item.process())`
- `as`キャストの使用禁止
- Non-null assertion (`!`) の使用は推奨されない（Biome警告）

### 責務分離の原則

- 関数は単一の責務を持つこと
- 関数名から想像できる責務以外は実装しない
- 既存のユーティリティがある場合は必ず使用する
- 安易な共通化・抽象化・リファクタリングは禁止

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# 型チェック + Lint + Format（推奨）
npm run fix

# Lint のみ
npm run _lint

# Format のみ
npm run _format
```

## ファイル構成

```
three-webgpu/
├── src/
│   ├── main.ts          # エントリーポイント
│   ├── counter.ts       # サンプルコード
│   ├── style.css        # グローバルスタイル
│   └── typescript.svg   # アセット
├── public/              # 静的ファイル
├── index.html           # HTMLテンプレート
├── biome.json           # Biome設定
├── tsconfig.json        # TypeScript設定
└── package.json         # 依存関係
```

## 依存関係の分類

### dependencies（実行時に必要）
- `three`: Three.js本体
- `leva`: GUIツール

### devDependencies（開発時のみ必要）
- `@biomejs/biome`: リンター・フォーマッター
- `@types/three`: Three.jsの型定義
- `typescript`: TypeScriptコンパイラ
- `vite`: ビルドツール

## 変更時の注意事項

### ファイル編集時

1. **変更範囲の最小化**: 必要な箇所のみ変更
2. **既存フローの維持**: 既存の分岐やフラグの意味を変更しない
3. **型の厳守**: 既存の型・公開IFを変更しない
4. **差分の明確化**: 変更理由を簡潔に記述

### 実装前の確認

- 不明点がある場合は先に質問する
- 大規模変更が必要な場合は中断して提案する
- 既存のユーティリティの有無を確認する

### 品質チェック

変更後は必ず以下を実行：

```bash
# 型チェック + Lint + Format
npm run fix
```

## Three.js開発のベストプラクティス

### WebGPU使用時の注意

- Three.js r150以降でWebGPUサポートが追加
- `WebGPURenderer`を使用する場合は互換性に注意
- フォールバック処理の実装を検討

### パフォーマンス

- 不要なオブジェクトは`dispose()`で破棄
- アニメーションループでのメモリリークに注意
- `requestAnimationFrame`の適切な管理

### leva使用時

- GUIパラメータは適切な範囲・ステップを設定
- パラメータ変更時のパフォーマンスに注意
- 開発用GUIは本番ビルドで条件付き除外を検討

## トラブルシューティング

### Biome警告が出る場合

- Non-null assertion (`!`)を使用している可能性
- オプショナルチェーン(`?.`)やnullチェックで対応

### TypeScriptエラーが出る場合

- `@types/three`がdevDependenciesにあることを確認
- `tsconfig.json`の設定を確認

### ビルドエラーが出る場合

- `node_modules`を削除して再インストール
- キャッシュをクリア: `rm -rf node_modules/.vite`

## 参考リンク

- [Three.js公式ドキュメント](https://threejs.org/docs/)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [Biome公式ドキュメント](https://biomejs.dev/)
- [leva公式ドキュメント](https://github.com/pmndrs/leva)

