import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Memoir from './Memoir'

/**
 * 直接 render Memoir 頁面殼，順帶覆蓋整條 timeline 鏈：
 * MemoirTimeline → TimelineSpine + StageSection → RecipientCard → PhotoFigure。
 * 跳過 MemoirGate 的口令流程，專注於內容渲染契約。
 */
describe('Memoir 頁面殼', () => {
  it('渲染 hero 主標與引言', () => {
    render(<Memoir />)
    expect(screen.getByRole('heading', { level: 1, name: /成長回顧與感謝/ })).toBeInTheDocument()
  })

  it('渲染童年階段的 h2 主標與 era 標籤', () => {
    render(<Memoir />)
    expect(
      screen.getByRole('heading', { level: 2, name: /在原生家庭裡學會被愛/ }),
    ).toBeInTheDocument()
    expect(screen.getByText(/1995 — 2001/)).toBeInTheDocument()
  })

  it('渲染爸爸的卡片與其 alt 非空的封面照片', () => {
    render(<Memoir />)
    expect(screen.getByText(/致 爸爸/)).toBeInTheDocument()
    const cover = screen.getByAltText(/與爸爸的合影/)
    expect(cover).toBeInTheDocument()
    expect(cover.getAttribute('src')).toBeTruthy()
  })
})
