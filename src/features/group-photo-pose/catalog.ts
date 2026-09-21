import entries from './poses.json'

export const groupSizes = [3, 4, 5, 6, 7, 8] as const
export type Pose = (typeof entries)[number]
export const poses: Pose[] = entries.filter((pose) => pose.title.trim() && pose.image.trim())

export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}group-photo-pose/${path}`
}

export const historyKey = 'group-photo-pose:shown:v1'

export function readHistory(): string[] {
  const value: unknown = JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')
  if (!Array.isArray(value) || !value.every((id) => typeof id === 'string')) {
    throw new Error('Invalid pose history')
  }
  // Verify writes before allowing a draw; do not silently lose history on refresh.
  sessionStorage.setItem(historyKey, JSON.stringify(value))
  return value
}
