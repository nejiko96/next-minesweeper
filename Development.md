# Next.js アプリ開発

## 環境構築

1. Node.js のインストール  
   https://nodejs.org/ja/

   ```
   node --version
   npm install -g npm
   npm --version
   ```

## 新規プロジェクト作成

```
workspace % npx create-next-app@latest
Need to install the following packages:
  create-next-app@13.4.9
Ok to proceed? (y) y
✔ What is your project named? … next-minesweeper
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias? … No / Yes
Creating a new Next.js app in /Users/haruko/workspace/next-minesweeper.
```

## 開発の流れ

1. アプリ起動

   ```
   npm run dev
   ```

   サーバが起動して  
   http://localhost:3000/  
   といった URL が表示されるのでブラウザから開くとアプリが動かせる

1. 起動した状態のままソースを追加・変更すると自動でブラウザに反映される

1. 停止  
   Ctrl+C

1. ビルド

   ```
   npm run build
   ```

   `.next` フォルダにビルド結果が生成される

## VSCode の設定

### eslint (JavaScript コードチェッカー)

1. コードが最新の TypeScript のお作法に沿って書かれているかチェックしてくれる

1. プロジェクト作成時の質問で「Would you like to use ESLint?」にYesと答えると  
   eslint がプロジェクトに追加されて設定が行われた状態になっている

1. VSCode の拡張機能で「ESLint」をインストール

   1. エディタでソースを開くとコードチェックエラーが「問題」タブに出てくるようになる

   1. `.vscode/settings.json` に以下の設定をするとソース保存時に自動で修正される
      ```
      {
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true,
        }
      }
      ```

### Prettier （コードフォーマッター）

コードをいい感じに整形してくれる

1. パッケージ追加

   - prettier : Prettier本体
   - eslint-config-prettier : eslint のフォーマットルールを一部無効化する

   ```
   npm install --save-dev prettier eslint-config-prettier
   ```

1. `.prettierrc.json` を作成

   ```
   {
   "printWidth": 120,
   "tabWidth": 2,
   "singleQuote": true,
   "semi": false
   }
   ```

1. `.eslintrc.json` の設定追加

   ```
   {
     "extends": ["next/core-web-vitals", "prettier"]
   }
   ```

1. VSCode の拡張機能で「Prettier」をインストール

1. `.vscode/settings.json` の設定追加

   ```
   // ESLintのフォーマット機能を無効化
   "eslint.format.enable": false,

   // 保存時にPrettierによる整形を行う
   "editor.formatOnSave": true,
   "[javascript][javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
   },
   "[typescript][typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
   },
   ```

### Tailwind CSS (CSS ライブラリ)

1. プロジェクト作成時の質問で「Would you like to use Tailwind CSS? 」にYesと答えると  
   プロジェクトに追加されて設定が行われた状態になっている

1. VSCode の拡張機能「Tailwind CSS IntelliSense」を入れておくと便利

1. prettier-plugin-tailwindcss の導入
   - class の並び順をソートしてくれる  
     ずらずら並ぶのはそのまま
   ```
   npm install --save-dev prettier-plugin-tailwindcss
   ```
