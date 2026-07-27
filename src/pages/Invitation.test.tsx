import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import {
  NOTES,
  PARKING_MAP_ALT,
  VENUE_ADDRESS,
  VENUE_NAME,
} from '../features/invitation/data/event'
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

  it('列出所有提醒事項', () => {
    renderInvitation()
    expect(screen.getByRole('heading', { name: '提醒事項' })).toBeInTheDocument()
    for (const note of NOTES) {
      expect(screen.getByText(note)).toBeInTheDocument()
    }
  })

  it('停車資訊呈現場地提供的停車地圖，並以 alt 帶出圖內的停車點與收費', () => {
    renderInvitation()
    const map = screen.getByRole('img', { name: /停車資訊圖/ })
    expect(map).toHaveAttribute('width')
    expect(map).toHaveAttribute('height')
    expect(map).toHaveAttribute('loading', 'lazy')

    // 頁面上只有圖，收費資訊唯一的無障礙管道就是 alt
    const alt = map.getAttribute('alt') ?? ''
    expect(alt).toBe(PARKING_MAP_ALT)
    for (const spot of ['P1', 'P2', 'P3']) {
      expect(alt).toContain(spot)
    }
    expect(alt).toContain('每小時 20 元')
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

  it('不顯示回首頁連結與地圖下方的導航外連', () => {
    renderInvitation()
    expect(screen.queryByRole('link', { name: /回首頁/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /導航/ })).not.toBeInTheDocument()
    // 「地點」區塊的 Google 地圖外連仍保留
    expect(screen.getByRole('link', { name: /在 Google 地圖開啟/ })).toBeInTheDocument()
  })
})
