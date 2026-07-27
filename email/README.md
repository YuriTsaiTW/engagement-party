# 電子邀請函（Gmail 內文版）

`invitation-email.html` 是給 Gmail 內文用的 email-safe 版邀請函，與網站的 `/invitation` 頁面各自獨立。

## 為什麼不直接把 `/invitation` 貼進 Gmail

`/invitation` 是 client-side rendering 的 SPA，Gmail 的 sanitizer 會讓它整頁失效：

| 網頁上的實作 | Gmail 的處理 | 這裡的替代方案 |
| --- | --- | --- |
| CSR SPA（內容由 `assets/index-*.js` 掛載） | 剝除 `<script>`，只剩空白 | 靜態 HTML，內容直接寫在標籤裡 |
| `VenueMap` 的 `<iframe>` Google 地圖 | 完全移除 `<iframe>` | 地址文字 + `MAPS_URL` 連結 + 停車地圖 JPG |
| `PrintOnlyQrCode` 的 inline `<svg>` | 不渲染 SVG | 移除；信件裡直接點連結即可 |
| `CoverPhoto` 按住切換插畫（Pointer Events） | JS 失效 | 取婚紗照單張靜態圖 |
| Tailwind v4 `@theme` 的 `oklch()` 自訂屬性 | 丟棄 CSS 自訂屬性 | 寫死 sRGB hex（見下表） |
| Noto Serif TC / Noto Sans TC webfont | 不載入外部字型 | CJK 安全字型堆疊，襯線標題自然降級 |

## 品牌色對照

hex 值是把 `src/styles/index.css` 的 `oklch()` 丟進瀏覽器 canvas 光柵化後取得的實際 sRGB 值，不是估算的。

| Token | oklch | hex |
| --- | --- | --- |
| `brand-50` | `oklch(0.98 0.02 20)` | `#fff4f3` |
| `brand-100` | `oklch(0.94 0.04 20)` | `#ffe1e0` |
| `brand-300` | `oklch(0.84 0.1 20)` | `#ffb0b0` |
| `brand-500` | `oklch(0.72 0.16 20)` | `#f8767a` |
| `brand-700` | `oklch(0.55 0.18 20)` | `#c53443` |
| `brand-900` | `oklch(0.32 0.14 20)` | `#680011` |

## 圖片為什麼放 `public/email/`

`public/` 底下的檔案會被 Vite 原封不動複製到 `dist/` 根目錄，**不經過 content hash**，所以網址永久穩定：

```
public/email/cover.jpg   → https://yuritsaitw.github.io/engagement-party/email/cover.jpg
public/email/parking.jpg → https://yuritsaitw.github.io/engagement-party/email/parking.jpg
```

不要改用 `dist/assets/` 底下帶 hash 的網址（例如 `cover-mobile-BzCUt4RH.jpg`）。那些檔名每次 build 都可能變動，信件寄出後會在收件匣裡長期存在，連結一旦失效就無法回頭修。

圖片一律走 https 外連而非 base64 內嵌，避免觸發 Gmail 約 102KB 的裁信門檻（超過會顯示「顯示完整訊息」）。

## 寄送流程

1. **先確認圖片已上線。** `public/email/` 的變更要先 commit、push 到 `main`，等 Actions 部署完成後逐一確認回傳 200：
   ```sh
   for f in cover.jpg parking.jpg; do
     printf '%s -> ' "$f"
     curl -s -o /dev/null -w '%{http_code}\n' "https://yuritsaitw.github.io/engagement-party/email/$f"
   done
   ```
2. 用瀏覽器開啟 `invitation-email.html`。
3. 全選（<kbd>⌘</kbd><kbd>A</kbd>）→ 複製（<kbd>⌘</kbd><kbd>C</kbd>）→ 貼進 Gmail 撰寫視窗。
   Gmail 沒有「貼上 HTML 原始碼」的欄位，只能走這個管道；若要程式化寄送則改用 Gmail API 送 MIME。
4. **先寄一封給自己**，在桌機 Gmail 與手機 App 各確認一次（圖片、按鈕、連結、深色模式）。確認無誤再寄給客人。

## 維護注意

信件內容是**刻意寫死**的，不會自動跟 `src/features/invitation/data/event.ts` 同步。若 `event.ts` 的 `VENUE_NAME`、`VENUE_ADDRESS`、`MAPS_URL`、`NOTES`、`PARKING_MAP_ALT` 或日期時間有變更，`invitation-email.html` 要手動一併修改。

修改時請維持兩個限制：

- **所有樣式一律 inline `style=""`**，不要加 `<style>` 區塊 — Gmail 貼上後不會保留。
- **版型用 `<table>`**，不要用 flex / grid，並在每個區塊明確指定 `background-color`（Gmail 深色模式會反轉未指定背景的區域）。
