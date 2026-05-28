/**
 * memoir 模組的核心型別。
 *
 * Photo.src 存的是**檔名**（不是完整路徑），由 data/photos.ts 的 resolvePhoto()
 * 透過 Vite import.meta.glob 對應到實際資源 URL。
 */

export type Photo = {
  /** 檔名，需存在於 src/features/memoir/assets/ */
  src: string
  /** A11y 必填，描述照片內容 */
  alt: string
  /** 選填，顯示在照片下方 */
  caption?: string
}

export type Recipient = {
  /** kebab-case，stage 內唯一 */
  id: string
  /** 顯示名稱，如「爸爸」 */
  name: string
  /** 關係標籤，如「原生家庭」 */
  relationLabel?: string
  /** 至少一張；第一張作為卡片封面 */
  photos: Photo[]
  /** 感謝話語，逐段；以陣列維持段落間距 */
  message: string[]
}

export type Stage = {
  /** kebab-case，全域唯一 */
  id: string
  /** 由小到大排序用 */
  order: number
  /** 年代或階段名，如「1995 — 2001 · 童年」 */
  era: string
  /** 階段主標 */
  title: string
  /** 階段自述，逐段 */
  narrative: string[]
  /** 該階段對應的賓客感謝 */
  recipients: Recipient[]
}
