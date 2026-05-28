import { describe, expect, it } from 'vitest'
import { buildMemoirVariants } from './useMemoirMotion'

describe('buildMemoirVariants', () => {
  it('reduced=false：sectionVariants.hidden 帶非零 y 位移、show 有 duration', () => {
    const { sectionVariants, cardVariants } = buildMemoirVariants(false)
    expect(sectionVariants.hidden).toMatchObject({ opacity: 0, y: 24 })
    const sectionShow = sectionVariants.show as { transition: { duration: number } }
    expect(sectionShow.transition.duration).toBeGreaterThan(0)
    expect(cardVariants.hidden).toMatchObject({ opacity: 0, y: 12 })
  })

  it('reduced=true：位移全歸零、duration 為 0，但 opacity 仍由 0 過渡到 1', () => {
    const { sectionVariants, cardVariants } = buildMemoirVariants(true)
    expect(sectionVariants.hidden).toMatchObject({ opacity: 0, y: 0 })
    expect(cardVariants.hidden).toMatchObject({ opacity: 0, y: 0 })
    const sectionShow = sectionVariants.show as {
      opacity: number
      transition: { duration: number }
    }
    expect(sectionShow.transition.duration).toBe(0)
    expect(sectionShow.opacity).toBe(1)
  })
})
