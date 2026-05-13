# features/flow

活動流程控制：章節切換、流程選單、倒數計時、頁面過渡。

- `components/`：章節選單、上下頁按鈕、進度指示。
- `store.ts`：目前章節、章節順序、過渡狀態。
- 頁面切換動畫優先用瀏覽器原生 View Transitions API，搭配 GSAP 做進階時間軸。
