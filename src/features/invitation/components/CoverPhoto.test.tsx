import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CoverPhoto } from './CoverPhoto'

/**
 * 取得插畫 <img>（疊在照片之上）。未顯示時帶 aria-hidden，
 * 會被 getByRole 濾掉，因此改用 alt 文字查詢。
 */
function getIllustration() {
  return screen.getByAltText(/手繪插畫/)
}

function getButton() {
  return screen.getByRole('button', { name: /按住查看結婚書約插畫/ })
}

describe('CoverPhoto', () => {
  it('預設顯示婚紗照，插畫為透明且不對輔助技術曝光', () => {
    render(<CoverPhoto />)
    expect(screen.getByRole('img', { name: /婚紗照/ })).toBeInTheDocument()
    const illust = getIllustration()
    expect(illust.className).toContain('opacity-0')
    expect(illust).toHaveAttribute('aria-hidden', 'true')
    expect(getButton()).toHaveAttribute('aria-pressed', 'false')
  })

  it('按住時顯示插畫，放開後還原', () => {
    render(<CoverPhoto />)
    const btn = getButton()

    fireEvent.pointerDown(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'true')
    expect(getIllustration().className).toContain('opacity-100')

    fireEvent.pointerUp(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'false')
    expect(getIllustration().className).toContain('opacity-0')
  })

  it('指標移出、取消或失焦時還原，避免插畫卡住', () => {
    render(<CoverPhoto />)
    const btn = getButton()

    fireEvent.pointerDown(btn)
    fireEvent.pointerLeave(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'false')

    fireEvent.pointerDown(btn)
    fireEvent.pointerCancel(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'false')

    fireEvent.pointerDown(btn)
    fireEvent.blur(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'false')
  })

  it('鍵盤 Space／Enter 按住同樣可切換', () => {
    render(<CoverPhoto />)
    const btn = getButton()

    for (const key of [' ', 'Enter']) {
      fireEvent.keyDown(btn, { key })
      expect(btn).toHaveAttribute('aria-pressed', 'true')
      fireEvent.keyUp(btn, { key })
      expect(btn).toHaveAttribute('aria-pressed', 'false')
    }
  })

  it('兩張圖都標註尺寸並提供有意義的替代文字', () => {
    render(<CoverPhoto />)
    for (const img of screen.getAllByRole('img', { hidden: true })) {
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
      expect(img.getAttribute('alt')).not.toBe('')
    }
  })
})
