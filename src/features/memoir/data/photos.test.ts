import { describe, expect, it } from 'vitest'
import { hasPhoto, listPhotoFilenames, resolvePhoto } from './photos'

describe('photos 解析', () => {
  it('listPhotoFilenames 至少包含爸爸 placeholder', () => {
    expect(listPhotoFilenames()).toContain('dad-placeholder.svg')
  })

  it('hasPhoto 對已知檔案回 true、未知檔案回 false', () => {
    expect(hasPhoto('dad-placeholder.svg')).toBe(true)
    expect(hasPhoto('does-not-exist.png')).toBe(false)
  })

  it('resolvePhoto 已知檔回非空 URL string', () => {
    const url = resolvePhoto('dad-placeholder.svg')
    expect(typeof url).toBe('string')
    expect(url.length).toBeGreaterThan(0)
  })

  it('resolvePhoto 未知檔丟錯，錯誤訊息要點出檔名', () => {
    expect(() => resolvePhoto('nope.png')).toThrow(/nope\.png/)
    expect(() => resolvePhoto('nope.png')).toThrow(/找不到照片/)
  })
})
