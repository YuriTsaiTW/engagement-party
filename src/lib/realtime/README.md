# lib/realtime

賓客即時互動遊戲的後端服務**尚未選定**。Bootstrap 階段刻意不安裝任何 SDK，避免提早綁定資料模型與架構。

## 三個候選

| 服務 | 模式 | 優點 | 缺點 |
| --- | --- | --- | --- |
| **PartyKit**（Cloudflare） | 邊界 WebSocket 房間 | 無伺服器、最輕量、TypeScript 一條龍 | 綁 Cloudflare 生態 |
| **Supabase Realtime** | Postgres + Phoenix Channels | 開源、可自架、RLS 權限 | 需設計 SQL schema |
| **Firebase Realtime DB** | NoSQL pub/sub | SDK 成熟、Google 支援 | 免費同時連線數限制（100）、vendor lock-in |

## 決策時機

第一個要動工的遊戲（例如「現場照片牆」或「猜謎」）開發前，做一次 spike：
- 50–150 賓客同時連線壓測。
- 房間建立 / 加入流程（QR code 發 join URL）。
- 訊息延遲與失敗重連體驗。
- 免費額度足以支撐單日活動。

## 暫時做法

- 暫時不依賴後端的功能，可先用 `URL state` 或 `Zustand store` 撐住開發節奏。
- 等選定後再在此目錄新增 `client.ts`、`useRoom.ts` 等檔案。
