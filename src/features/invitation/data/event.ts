/** 訂婚派對活動資訊：單一資料來源，供螢幕版型與列印明信片共用。 */

export const VENUE_NAME = '安億 360'
export const VENUE_ADDRESS = '708 臺南市安平區億載里安億路 360 號 3 樓'

const VENUE_QUERY = `${VENUE_NAME} ${VENUE_ADDRESS}`

/**
 * 「在 Google 地圖開啟」外連：直接指向場地的 Google Maps 地標短連結
 * （解析後為「安億360空間｜場地租借」），比關鍵字搜尋更精準。
 */
export const MAPS_URL = 'https://maps.app.goo.gl/t8W8ENv32LUmqZzo9'

/**
 * 免金鑰的地圖嵌入。GitHub Pages 是純靜態站，若改走官方 Maps Embed API
 * 會把 API key 曝光在前端，因此採用 output=embed。
 */
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  VENUE_QUERY,
)}&hl=zh-TW&output=embed`

/**
 * 停車選項（取自場地提供的停車資訊圖）。
 * 圖片本身是 JPEG，輔助技術讀不到裡面的文字，故同步以文字列出。
 */
export const PARKING_SPOTS = [
  { id: 'P1', name: '免費空地停車位置', detail: null },
  { id: 'P2', name: '路邊停車格', detail: '24 小時收費，每小時 20 元' },
  { id: 'P3', name: '港濱歷史公園停車場 A 場', detail: '24 小時收費，每小時 20 元' },
] as const

export const NOTES = [
  '不收禮金，人到就是最棒的禮物。',
  '可以保留一點胃給現場準備的點心外燴。',
  '非常歡迎自備環保餐具。',
  '剩下的就是 — Enjoy!',
] as const
