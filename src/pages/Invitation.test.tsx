import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { NOTES, VENUE_ADDRESS, VENUE_NAME } from '../features/invitation/data/event'
import Invitation from './Invitation'

function renderInvitation() {
  return render(
    <MemoryRouter>
      <Invitation />
    </MemoryRouter>,
  )
}

describe('Invitation', () => {
  it('顯示新人姓名作為唯一 h1', () => {
    renderInvitation()
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('昱德(Lloyd)')
    expect(headings[0]).toHaveTextContent('秀慧(Yuri)')
  })

  it('標題下方顯示邀請語', () => {
    renderInvitation()
    expect(screen.getByText('在這一天，我們將以新鮮的身份和你分享喜悅')).toBeInTheDocument()
    expect(screen.queryByText(/誠摯邀請您/)).not.toBeInTheDocument()
  })

  it('顯示活動日期與時間', () => {
    renderInvitation()
    expect(screen.getByText('2026 年 9 月 26 日（六）')).toBeInTheDocument()
    expect(screen.getByText(/13:30/)).toBeInTheDocument()
    expect(screen.getByText(/14:00/)).toBeInTheDocument()
  })

  it('顯示場地名稱與地址', () => {
    renderInvitation()
    expect(screen.getByText(VENUE_NAME)).toBeInTheDocument()
    expect(screen.getByText(VENUE_ADDRESS)).toBeInTheDocument()
  })

  it('列出所有注意事項', () => {
    renderInvitation()
    for (const note of NOTES) {
      expect(screen.getByText(note)).toBeInTheDocument()
    }
  })

  it('保留停車提醒（沿用改版前的來賓提示）', () => {
    renderInvitation()
    expect(screen.getByText(/建議提早抵達以利尋找車位/)).toBeInTheDocument()
  })

  it('封面照片具備有意義的 alt 與尺寸屬性（避免 CLS）', () => {
    renderInvitation()
    const img = screen.getByRole('img', { name: /婚紗照/ })
    expect(img).toHaveAttribute('width')
    expect(img).toHaveAttribute('height')
    expect(img.getAttribute('alt')).not.toBe('')
  })

  it('地圖 iframe 具備可存取名稱與 lazy loading', () => {
    renderInvitation()
    const map = screen.getByTitle(`${VENUE_NAME} 位置地圖`)
    expect(map).toHaveAttribute('loading', 'lazy')
    expect(map.getAttribute('src')).toContain('output=embed')
  })

  it('提供 Google 地圖外連並以 noopener 開新視窗', () => {
    renderInvitation()
    const links = screen.getAllByRole('link', { name: /Google 地圖/ })
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })

  it('提供回首頁連結', () => {
    renderInvitation()
    expect(screen.getByRole('link', { name: /回首頁/ })).toHaveAttribute('href', '/')
  })
})
