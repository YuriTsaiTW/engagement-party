import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import MemoirGate from './MemoirGate'

// ⚠️ 測試固定 fixture：這個明碼**僅供測試**對應 MemoirGate.tsx 內目前的
// EXPECTED_HASH（pilot 階段的 placeholder hash）。當使用者更新 EXPECTED_HASH 時，
// 請**同時**更新這個 fixture；否則本測試會在 CI 紅燈，提醒兩處未同步。
// 正式上線後請確認此檔不會 commit 到公開 repo，或改為從環境變數讀取。
const PLACEHOLDER_PASS = 'lloyd-yuri-2026'

describe('MemoirGate', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })
  afterEach(() => {
    window.sessionStorage.clear()
  })

  it('未解鎖時顯示口令表單', () => {
    render(<MemoirGate />)
    expect(screen.getByRole('heading', { name: /回顧頁面/ })).toBeInTheDocument()
    expect(screen.getByLabelText('口令')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /進入回顧/ })).toBeInTheDocument()
  })

  it('錯誤口令顯示錯誤訊息且不解鎖、表單仍可重試', async () => {
    const user = userEvent.setup()
    render(<MemoirGate />)
    await user.type(screen.getByLabelText('口令'), 'wrong-pass')
    await user.click(screen.getByRole('button', { name: /進入回顧/ }))
    expect(await screen.findByText(/口令不正確/)).toBeInTheDocument()
    expect(screen.getByLabelText('口令')).toBeInTheDocument()
    expect(window.sessionStorage.getItem('memoir.unlocked')).toBeNull()
  })

  it('正確口令觸發解鎖並寫入 sessionStorage、表單消失', async () => {
    const user = userEvent.setup()
    render(<MemoirGate />)
    await user.type(screen.getByLabelText('口令'), PLACEHOLDER_PASS)
    await user.click(screen.getByRole('button', { name: /進入回顧/ }))
    await waitFor(() => {
      expect(window.sessionStorage.getItem('memoir.unlocked')).toBe('1')
    })
    await waitFor(() => {
      expect(screen.queryByLabelText('口令')).not.toBeInTheDocument()
    })
  })

  it('sessionStorage 已標記解鎖時直接放行不再顯示表單', () => {
    window.sessionStorage.setItem('memoir.unlocked', '1')
    render(<MemoirGate />)
    expect(screen.queryByLabelText('口令')).not.toBeInTheDocument()
  })
})
