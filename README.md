# お家で食べよう

近所のテイクアウトできるお店を知って、食べて応援しよう。

## 開発環境構築

Node.js の実行環境を準備してください。必要なバージョンは `.node-version` を参照してください。

Nuxt ベースで開発し、TypeScript を利用しています。

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
$ yarn generate
```

データの管理プラットフォームとして Airtable を利用しています。個別に招待してもらってください。

実行するためには、2つの環境変数の設定が必要です。

### AIRTABLE_API_KEY

ユーザーごとに取得します。Account ページで生成してください。
https://airtable.com/account

### AIRTABLE_BASE_ID

以下の URL から見ることができます。Workspace へ招待してもらってから、使っている Base の ID を取得してください。
https://airtable.com/api
