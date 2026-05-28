import type { FormEvent } from 'react'
import { lazy, Suspense, useId, useState } from 'react'

/**
 * 賓客口令 Gate。
 *
 * **誠實前提**：這是靜態站，前端口令屬「擋路人誤闖」等級，非真資安。
 * 我們做兩件事提高門檻：
 *  1. 不存口令明碼，只存 SHA-256 hash（搭配 Web Crypto subtle.digest 比對）。
 *  2. 解鎖後才以 React.lazy 動態 import 內容模組，避免照片 URL 與感謝詞
 *     出現在初始 bundle 被被動掃到。
 *
 * 解鎖狀態存 sessionStorage（關閉分頁即失效）。
 */

// 賓客口令的 SHA-256 hash。**只記 hash，永遠不要在這個檔案裡（或任何被 commit 的檔案）
// 留下口令明碼，否則 hash 形同虛設。** 目前是 pilot 用的 placeholder hash，使用者驗收
// 外觀後請替換。
// 重新產生方式：在終端機跑 `echo -n "<新口令>" | shasum -a 256`，**只**把輸出貼下方。
// 測試固定 fixture：見 MemoirGate.test.tsx 註解。
const EXPECTED_HASH = '92e72518823498a6d0b8eec9cd3ca74ecc58e436e10ec75b2c07773eb5b5c576'

const STORAGE_KEY = 'memoir.unlocked'

const Memoir = lazy(() => import('./components/Memoir'))

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function readUnlocked(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function persistUnlocked(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // sessionStorage 不可用時退化為記憶體狀態（本次 session 仍解鎖，重整失效）
  }
}

export default function MemoirGate() {
  const [unlocked, setUnlocked] = useState<boolean>(readUnlocked)
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const inputId = useId()
  const errorId = useId()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const hash = await sha256Hex(input.trim())
      if (hash === EXPECTED_HASH) {
        persistUnlocked()
        setUnlocked(true)
      } else {
        setError('口令不正確，再試一次。')
      }
    } catch (_err) {
      setError('驗證失敗，請重新整理後再試。')
    } finally {
      setSubmitting(false)
    }
  }

  if (unlocked) {
    return (
      <Suspense fallback={<MemoirFallback />}>
        <Memoir />
      </Suspense>
    )
  }

  return (
    <main
      aria-labelledby="memoir-gate-title"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <p className="font-body text-sm uppercase tracking-[0.4em] text-brand-500">limited access</p>
      <h1 id="memoir-gate-title" className="font-display text-3xl text-brand-700 sm:text-4xl">
        回顧頁面 · 賓客專屬
      </h1>
      <p className="max-w-md font-body text-sm text-brand-900/70">
        這一頁是寫給特定賓客的成長回顧與感謝，請輸入邀請函上的口令。
      </p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3" noValidate>
        <label htmlFor={inputId} className="sr-only">
          口令
        </label>
        <input
          id={inputId}
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={error != null}
          aria-describedby={error != null ? errorId : undefined}
          placeholder="輸入口令"
          className="rounded-md border border-brand-300/60 bg-background px-4 py-2 font-body text-base text-foreground outline-none ring-brand-500 focus-visible:ring-2"
        />
        <button
          type="submit"
          disabled={submitting || input.length === 0}
          className="rounded-md bg-brand-500 px-4 py-2 font-body text-sm font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
        >
          {submitting ? '驗證中…' : '進入回顧'}
        </button>
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="min-h-5 font-body text-sm text-destructive"
        >
          {error}
        </p>
      </form>
    </main>
  )
}

function MemoirFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <p className="font-body text-sm uppercase tracking-[0.3em] text-brand-500">載入中…</p>
    </main>
  )
}
