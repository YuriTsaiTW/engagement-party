import { describe, expect, it } from 'vitest'
import { hasPhoto } from './photos'
import { orderedStages, stages, stagesById } from './stages'

describe('memoir stages 資料完整性', () => {
  it('每個 stage id 唯一', () => {
    const ids = stages.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('orderedStages 依 order 嚴格升冪', () => {
    for (let i = 1; i < orderedStages.length; i++) {
      const prev = orderedStages[i - 1]
      const curr = orderedStages[i]
      expect(prev).toBeDefined()
      expect(curr).toBeDefined()
      if (prev && curr) {
        expect(prev.order).toBeLessThan(curr.order)
      }
    }
  })

  it('stagesById 對每個 stage 都可解析回原物件', () => {
    for (const s of stages) {
      expect(stagesById[s.id]).toBe(s)
    }
  })

  it('同一 stage 內 recipient id 唯一', () => {
    for (const stage of stages) {
      const ids = stage.recipients.map((r) => r.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('每張照片皆可在 assets/ 解析、且 alt 非空', () => {
    for (const stage of stages) {
      for (const r of stage.recipients) {
        for (const p of r.photos) {
          expect(hasPhoto(p.src), `${stage.id}/${r.id} 缺照片 ${p.src}`).toBe(true)
          expect(p.alt.trim().length).toBeGreaterThan(0)
        }
      }
    }
  })

  it('每位 recipient 至少有一張照片與一段感謝詞', () => {
    for (const stage of stages) {
      for (const r of stage.recipients) {
        expect(r.photos.length).toBeGreaterThanOrEqual(1)
        expect(r.message.length).toBeGreaterThanOrEqual(1)
      }
    }
  })

  it('Pilot：童年階段與爸爸都已就位', () => {
    const childhood = stagesById.childhood
    expect(childhood).toBeDefined()
    const dad = childhood?.recipients.find((r) => r.id === 'dad')
    expect(dad).toBeDefined()
    expect(dad?.name).toBe('爸爸')
  })
})
