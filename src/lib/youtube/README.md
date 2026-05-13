# lib/youtube

預留給 **YouTube IFrame Player API** 整合。Bootstrap 階段先不實作。

## 規劃

- `player.ts`：封裝 IFrame Player API（loadVideoById / playVideo / pauseVideo / seekTo / setVolume / getCurrentTime…）。
- `useYouTubePlayer.ts`：React hook，回傳 player ref 與播放狀態。
- 不另外裝 wrapper library（如 `react-youtube`、`youtube-player`），直接呼叫官方 API 以保留客製空間。
- YouTube Music 無公開 API，改用 YouTube 影片作為音源，並自行設計播放清單。

## 參考

- <https://developers.google.com/youtube/iframe_api_reference>
- IFrame API 不支援的功能：精細的音訊串流操控、純音訊抽離。若需播放清單演算法，需另行設計。

## 待辦

- 評估「桌機用 background autoplay」與 Chrome autoplay policy 的相容性。
- 派對現場若無網路備援，需準備本地音檔 fallback（放 `src/assets/audio/`）。
