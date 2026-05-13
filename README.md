# engagement-party

2026-10-10 訂婚派對活動現場使用的靜態前端網頁，承載多媒體展示、流程控制與賓客互動遊戲。

線上網址：<https://yuritsaitw.github.io/engagement-party/>

## 技術棧

- **Build / Framework**：Vite 8 + React 19 + TypeScript（strict）
- **Routing**：React Router v7（basename 走 `import.meta.env.BASE_URL`）
- **樣式 / UI**：Tailwind CSS v4（CSS-first config）+ shadcn/ui（Radix 底層）
- **動畫**：Motion（motion.dev）+ GSAP + `@lottiefiles/dotlottie-react` + 原生 View Transitions API
- **狀態**：Zustand（全域 ephemeral）+ TanStack Query（第三方資料）
- **測試**：Vitest 4 + @testing-library/react + Playwright
- **Lint / Format**：Biome v2（單一工具，取代 ESLint + Prettier）
- **部署**：GitHub Actions → GitHub Pages

> Realtime 後端（賓客遊戲）尚未選定，候選：PartyKit / Supabase Realtime / Firebase。第一個遊戲開發前再 spike 決定。詳見 `src/lib/realtime/README.md`。

## 環境需求

- **Node.js**：24 LTS（透過 `nvm`，repo 根目錄 `.nvmrc` 已鎖定）
- **pnpm**：11+（透過 `corepack`）
- macOS / Linux / Windows（WSL）

第一次設定：

```bash
nvm install 24 && nvm use 24
corepack enable
corepack prepare pnpm@latest --activate
```

## 啟動專案

```bash
pnpm install
pnpm dev        # http://localhost:5173/engagement-party/
```

## 常用 scripts

| 指令 | 用途 |
| --- | --- |
| `pnpm dev` | 開發伺服器（HMR） |
| `pnpm build` | 產出 production bundle 到 `dist/`（含 `404.html` SPA fallback） |
| `pnpm preview` | 本機預覽 production build |
| `pnpm test` | 啟動 Vitest watch 模式 |
| `pnpm test:run` | 跑一次 Vitest |
| `pnpm test:coverage` | 跑 Vitest 並產 coverage 報告 |
| `pnpm test:e2e` | 跑 Playwright E2E |
| `pnpm lint` | Biome 檢查 |
| `pnpm format` | Biome 格式化 |
| `pnpm typecheck` | TypeScript 型別檢查 |

## 目錄結構

```
src/
├─ main.tsx · router.tsx · App.tsx        # 入口與根 layout
├─ pages/                                 # 路由頁面
├─ components/{ui,layout}/                # 共用元件（shadcn/ui 在 ui/）
├─ features/{music,games,flow}/           # 功能領域
├─ hooks/ · stores/                       # 跨 feature 的 hooks / stores
├─ lib/{utils,youtube,realtime}/          # SDK 封裝與工具
├─ assets/{images,lottie,audio}/          # 靜態素材
├─ styles/index.css                       # Tailwind v4 entry
└─ test/setup.ts                          # Vitest 全域 setup
```

## 環境變數

目前無。

## 部署

`main` 分支收到 push 時，GitHub Actions 會：

1. checkout、安裝 pnpm 11 + Node 24
2. `pnpm install --frozen-lockfile`
3. `pnpm build`（產 `dist/`）
4. 上傳 artifact 至 GitHub Pages

也可在 Actions 頁面手動 `workflow_dispatch`。

子路徑 `/engagement-party/` 由 `vite.config.ts` 的 `base` 設定，React Router 透過 `import.meta.env.BASE_URL` 自動同步 basename。

## 測試覆蓋率

Bootstrap 階段 coverage threshold 暫設為 0%；每完成一個 feature 會逐步把對應檔案門檻調至 80%（CLAUDE.md 的全域標準）。
