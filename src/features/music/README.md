# features/music

客製 YouTube 音樂播放器與播放清單管理。

- `components/`：播放控制 UI（播放/暫停、進度條、音量、目前曲目）。
- `hooks/`：封裝播放狀態與 IFrame 事件。
- `store.ts`：Zustand store（目前曲目、佇列、播放狀態）。
- 底層 SDK 在 `@/lib/youtube`。
