# ガジェットブログ

Next.js と MDX を使用した現代的なブログプラットフォームです。

## 機能

- **Next.js App Router** - 最新のNext.jsのApp Routerを活用
- **MDX** - Markdown + JSXによるリッチなコンテンツ作成
- **カスタムコンポーネント** - アフィリエイトリンク、ツイート埋め込み、YouTubeなどの専用コンポーネント
- **レスポンシブデザイン** - モバイルからデスクトップまで対応
- **SEO対策** - メタタグや構造化データを最適化
- **タグとカテゴリ** - 記事の整理と検索性の向上
- **検索機能** - サイト内コンテンツの検索

## 始め方

### 前提条件

- Node.js 18.0.0以上
- Yarn または npm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/gadget-blog.git
cd gadget-blog

# 依存関係のインストール
yarn install
# または
npm install

# 開発サーバーの起動
yarn dev
# または
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてブログを確認できます。

## 記事の書き方

### MDXテンプレートの使用

このブログでは、用途別にカスタマイズされた複数のMDXテンプレートが用意されています：

1. **ハウツーガイド** - `/src/content/templates/howto-template.mdx`
2. **ニュース記事** - `/src/content/templates/news-template.mdx`
3. **製品レビュー** - `/src/content/templates/review-template.mdx`
4. **コンポーネントリファレンス** - `/src/content/templates/all-components-reference.mdx`

新しい記事を作成する際は、適切なテンプレートを `/src/content/posts/` ディレクトリにコピーして使用します。

### フロントマター

各記事は、以下のようなYAML形式のフロントマターから始まります：

```yaml
---
title: "記事のタイトル"
date: "YYYY-MM-DD"
tags: ["タグ1", "タグ2", "タグ3"]
thumbnail: "/images/カテゴリ/画像名.jpg"
excerpt: "記事の概要。100〜150文字程度。"
category: "カテゴリ名"
---
```

#### 必須項目

- **title**: 記事のタイトル
- **date**: 公開日（YYYY-MM-DD形式）
- **tags**: 関連するタグの配列
- **category**: 記事のカテゴリ

#### オプション項目

- **thumbnail**: サムネイル画像のパス（指定しない場合はデフォルト画像が使用されます）
- **excerpt**: 記事の概要（指定しない場合は本文から自動抽出）

### カスタムコンポーネント

#### 画像の挿入

Markdownの標準記法：
```markdown
![代替テキスト](/images/カテゴリ/画像名.jpg)
```

Next.js Image コンポーネントを使用（最適化あり）：
```jsx
<Image 
  src="/images/カテゴリ/画像名.jpg" 
  alt="画像の説明" 
  width={800} 
  height={600} 
/>
```

#### 情報ノート・警告ノート

```markdown
:::note info
これは情報ノートです。役立つ補足情報を書く場合に使用します。
:::

:::note warn
これは警告ノートです。注意点や留意事項を書く場合に使用します。
:::

:::note alert
これは警報ノートです。特に重要な警告を書く場合に使用します。
:::
```

#### アフィリエイトリンク

```jsx
<AffiliateLink
  title="製品名"
  imageUrl="/images/カテゴリ/製品画像.jpg"
  price="¥10,000（税込）"
  description="製品の簡単な説明"
  rating={4.5}
  amazonUrl="https://amazon.co.jp/..."
  rakutenUrl="https://rakuten.co.jp/..."
  yahooUrl="https://shopping.yahoo.co.jp/..."
/>
```

#### ツイート埋め込み

```jsx
<Tweet id="ツイートのID" />
```

#### YouTube動画埋め込み

```jsx
<YouTube id="YouTubeの動画ID" />
```

#### 日付表示

```jsx
<Date dateString="YYYY-MM-DD" />
```

### 詳細なリファレンス

すべてのコンポーネントと記法の詳細については、[コンポーネントリファレンス](/src/content/templates/all-components-reference.mdx)を参照してください。

## 画像のガイドライン

- ブログ記事の画像は `/public/images/` ディレクトリに配置します
- カテゴリごとにサブディレクトリを作成します：
  - `/public/images/howto/` - ハウツーガイド用画像
  - `/public/images/news/` - ニュース記事用画像
  - `/public/images/reviews/` - レビュー記事用画像
- 画像の最適なサイズ：
  - メイン画像: 1200 x 675 px（16:9）
  - サムネイル: 600 x 400 px
  - 記事内画像: 800 x 600 px (推奨)

## ディレクトリ構造

```
/
├── public/              # 静的ファイル
│   └── images/          # 画像ファイル
│       ├── howto/       # ハウツー記事用画像
│       ├── news/        # ニュース記事用画像
│       └── reviews/     # レビュー記事用画像
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # Reactコンポーネント
│   ├── content/         # MDXコンテンツ
│   │   ├── posts/       # ブログ記事
│   │   └── templates/   # 記事テンプレート
│   └── lib/            # ユーティリティ関数
```

## デプロイ

このプロジェクトは [Vercel](https://vercel.com) にデプロイすることを推奨します：

```bash
# Vercel CLIをインストール
npm i -g vercel

# デプロイ
vercel
```

## ライセンス

[MIT](LICENSE)