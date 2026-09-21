import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { historyKey } from '../features/group-photo-pose/catalog'
import GroupPhotoPose from './GroupPhotoPose'

vi.mock('../features/group-photo-pose/catalog', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../features/group-photo-pose/catalog')>()),
  poses: [
    { id: '3-01', people: 3, title: '比愛心', image: '3/01.jpg', audio: '3/01.mp3' },
    { id: '3-02', people: 3, title: '一起跳', image: '3/02.jpg', audio: '3/02.mp3' },
    { id: '4-01', people: 4, title: '四人合照', image: '4/01.jpg', audio: '' },
  ],
}))

beforeEach(() => {
  sessionStorage.clear()
  vi.useFakeTimers()
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

function chooseThree() {
  fireEvent.click(screen.getByRole('button', { name: /3\s*人/ }))
}

describe('合照抽選', () => {
  it('素材牆呈現全部素材，直接看圖不經動畫，返回保留焦點且與抽選共用紀錄', () => {
    render(<GroupPhotoPose />)
    fireEvent.click(screen.getByRole('button', { name: '小朋友區' }))
    fireEvent.click(screen.getByRole('button', { name: '素材牆' }))
    expect(screen.getAllByRole('button', { name: /^查看/ })).toHaveLength(3)
    fireEvent.click(screen.getByRole('button', { name: '查看 3 人姿勢：比愛心' }))
    expect(screen.getByRole('img', { name: '比愛心' })).toBeVisible()
    expect(screen.queryByRole('button', { name: '略過' })).not.toBeInTheDocument()
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual(['3-01'])
    fireEvent.click(screen.getByRole('button', { name: '返回素材牆' }))
    expect(screen.getByRole('button', { name: '查看 3 人姿勢：比愛心' })).toHaveFocus()
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: '查看 4 人姿勢：四人合照' }))
    expect(screen.getByRole('heading', { name: '四人合照' })).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: '重新開始' }))
    chooseThree()
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img')).toHaveAttribute('alt', '一起跳')
    expect(screen.queryByRole('button', { name: '返回素材牆' })).not.toBeInTheDocument()
  })

  it('瀏覽素材牆不消耗素材，返回選人數正常', () => {
    render(<GroupPhotoPose />)
    fireEvent.click(screen.getByRole('button', { name: '素材牆' }))
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual([])
    fireEvent.click(screen.getByRole('button', { name: '返回選擇人數' }))
    expect(screen.getByRole('button', { name: /3\s*人/ })).toBeEnabled()
  })

  it('小朋友區只抽精選素材，重新開始留在專區，與全部姿勢共用紀錄', () => {
    render(<GroupPhotoPose />)
    fireEvent.click(screen.getByRole('button', { name: '小朋友區' }))
    expect(screen.getByRole('heading', { name: '小朋友區' })).toHaveFocus()
    expect(screen.getByRole('button', { name: /4\s*人/ })).toBeDisabled()
    chooseThree()
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img')).toHaveAttribute('alt', '比愛心')
    expect(screen.getByText('並排站好，小手放胸前，一起做可愛的表情！')).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: '重新開始' }))
    expect(screen.getByRole('heading', { name: '小朋友區' })).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: '返回全部姿勢' }))
    chooseThree()
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img')).toHaveAttribute('alt', '一起跳')
    expect(screen.queryByText('並排站好，小手放胸前，一起做可愛的表情！')).not.toBeInTheDocument()
  })

  it('小朋友區抽完後只重置該人數的精選紀錄，保留一般素材與其他人數', () => {
    sessionStorage.setItem(historyKey, JSON.stringify(['3-01', '3-02', '4-01']))
    render(<GroupPhotoPose />)
    fireEvent.click(screen.getByRole('button', { name: '小朋友區' }))
    chooseThree()
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual(['3-01', '3-02', '4-01'])
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img')).toHaveAttribute('alt', '比愛心')
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual(['3-02', '4-01', '3-01'])
  })

  it('動畫結束才記錄結果，重新開始與重新掛載保留紀錄，一輪內不重複', () => {
    const view = render(<GroupPhotoPose />)
    chooseThree()
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual([])
    act(() => {
      vi.advanceTimersByTime(1800)
    })
    const first = screen.getByRole('img').getAttribute('alt')
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: '重新開始' }))
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()
    view.unmount()
    render(<GroupPhotoPose />)
    chooseThree()
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img')).not.toHaveAttribute('alt', first)
    act(() => {
      vi.advanceTimersByTime(1800)
    })
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: '重新開始' }))
    expect(screen.getByRole('button', { name: /3\s*人/ })).toBeEnabled()
    expect(screen.getByRole('button', { name: /4\s*人/ })).toBeEnabled()
    expect(screen.getByRole('button', { name: /5\s*人/ })).toBeDisabled()
  })

  it('抽完後從全部素材開始新一輪，只重置該人數的紀錄', () => {
    sessionStorage.setItem(historyKey, JSON.stringify(['3-01', '3-02', '4-01']))
    vi.spyOn(Math, 'random').mockReturnValue(0)
    render(<GroupPhotoPose />)
    chooseThree()
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual(['3-01', '3-02', '4-01'])
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img')).toHaveAttribute('alt', '比愛心')
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual(['4-01', '3-01'])
    fireEvent.click(screen.getByRole('button', { name: '重新開始' }))
    chooseThree()
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img')).toHaveAttribute('alt', '一起跳')
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual(['4-01', '3-01', '3-02'])
  })

  it('尚未提供音檔仍可揭曉圖片，不建立音訊或顯示播放按鈕', () => {
    const { container } = render(<GroupPhotoPose />)
    fireEvent.click(screen.getByRole('button', { name: /4\s*人/ }))
    fireEvent.click(screen.getByRole('button', { name: '略過' }))
    expect(screen.getByRole('img', { name: '四人合照' })).toBeVisible()
    expect(container.querySelector('audio')).toBeNull()
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
    expect(screen.queryByRole('button', { name: '播放音檔' })).not.toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '重新開始' })).toBeEnabled()
  })

  it('離開抽選動畫不消耗素材，也不留下計時器', () => {
    const view = render(<GroupPhotoPose />)
    chooseThree()
    view.unmount()
    act(() => {
      vi.advanceTimersByTime(1800)
    })
    expect(JSON.parse(sessionStorage.getItem(historyKey) ?? '[]')).toEqual([])
  })

  it('自動播放遭拒後能手動重試，圖片與音檔錯誤有提示', async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new Error('NotAllowedError'))
    const { container } = render(<GroupPhotoPose />)
    chooseThree()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '略過' }))
    })
    expect(screen.getByRole('status')).toHaveTextContent('音訊尚未播放')
    fireEvent.click(screen.getByRole('button', { name: '播放音檔' }))
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2)
    fireEvent.error(screen.getByRole('img'))
    expect(screen.getByRole('alert')).toHaveTextContent('圖片無法載入')
    const audio = container.querySelector('audio')
    if (!audio) throw new Error('Missing audio')
    fireEvent.error(audio)
    expect(screen.getByRole('status')).toHaveTextContent('音檔無法載入')
  })

  it.each(['broken', '{}', '[42]'])('歷史損毀時暫停抽選：%s', (value) => {
    sessionStorage.setItem(historyKey, value)
    render(<GroupPhotoPose />)
    expect(screen.getByRole('alert')).toHaveTextContent('無法儲存抽選紀錄')
    expect(screen.getByRole('button', { name: /3\s*人/ })).toBeDisabled()
  })

  it('儲存空間被封鎖時暫停抽選', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<GroupPhotoPose />)
    expect(screen.getByRole('alert')).toBeVisible()
    expect(screen.getByRole('button', { name: /3\s*人/ })).toBeDisabled()
  })
})
