/**
 * 將 memoir/assets/ 內的圖片以 Vite 靜態 glob 載入為 URL，提供以檔名解析的 helper。
 *
 * 走 Vite import 路線（不放 public/）的理由：
 * - 自動套 base path (/engagement-party/)、自動加 hash、缺檔在 build 期報錯。
 * - data/stages.ts 只記檔名，render 層才解析，方便日後改檔名/搬路徑。
 */

const modules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const byFilename = new Map<string, string>(
  Object.entries(modules).map(([key, url]) => {
    const filename = key.replace(/^.*\/assets\//, '')
    return [filename, url]
  }),
)

export function resolvePhoto(filename: string): string {
  const url = byFilename.get(filename)
  if (!url) {
    const known = [...byFilename.keys()].join(', ') || '(空)'
    throw new Error(`[memoir] 找不到照片：${filename}。已知檔案：${known}`)
  }
  return url
}

export function listPhotoFilenames(): string[] {
  return [...byFilename.keys()]
}

export function hasPhoto(filename: string): boolean {
  return byFilename.has(filename)
}
