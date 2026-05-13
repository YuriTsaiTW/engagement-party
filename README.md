# engagement-party

2026-10-10 訂婚派對活動現場使用的靜態純前端網頁，承載多媒體展示與互動遊戲。

線上網址：<https://yuritsaitw.github.io/engagement-party/>

## 環境需求

- 目前無相依（純 HTML / 無 build step）
- 未來引入框架後會在此補充 Node.js 版本與套件管理器

## 啟動專案

本機開發只要任一種方式即可：

- 直接以瀏覽器開啟 `index.html`
- 或在 repo 根目錄執行 `npx serve .` 啟動本機伺服器

## 環境變數

目前無。

## 部署

`main` 分支收到 push 時，GitHub Actions 會自動部署至 GitHub Pages（也可在 Actions 頁面手動 `workflow_dispatch`）。
