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

export const NOTES = [
  '不收禮金，人到就是最棒的禮物。',
  '可以保留一點胃給現場準備的點心外燴。',
  '非常歡迎自備環保餐具。',
  '剩下的就是 — Enjoy!',
] as const
