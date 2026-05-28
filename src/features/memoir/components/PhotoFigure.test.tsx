import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PhotoFigure } from './PhotoFigure'

/**
 * Pilot 階段只有一張封面照片（直接 render 為 Card first-child img），PhotoFigure
 * 是給「附加照片」用的；先以單元測試固定其渲染契約，待真實素材到位後自然覆蓋。
 */
describe('PhotoFigure', () => {
  it('渲染圖片 + alt + 選填 figcaption', () => {
    render(
      <PhotoFigure
        photo={{ src: 'dad-placeholder.svg', alt: '佔位圖描述', caption: '示意說明' }}
      />,
    )
    const img = screen.getByAltText('佔位圖描述')
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toBeTruthy()
    expect(screen.getByText('示意說明')).toBeInTheDocument()
  })

  it('無 caption 時不渲染 figcaption', () => {
    render(<PhotoFigure photo={{ src: 'dad-placeholder.svg', alt: '無說明' }} />)
    expect(screen.getByAltText('無說明')).toBeInTheDocument()
    expect(screen.queryByText(/示意說明/)).not.toBeInTheDocument()
  })
})
