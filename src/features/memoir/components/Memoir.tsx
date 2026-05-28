import { MemoirTimeline } from './MemoirTimeline'

/**
 * 回顧頁面殼（hero + 時間軸）。被 MemoirGate 以 React.lazy 動態載入，
 * 故未解鎖前不會出現在初始 bundle。
 */
export default function Memoir() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-12 text-center sm:mb-20">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-brand-500">
          memoir · gratitude
        </p>
        <h1 className="mt-3 font-display text-4xl text-brand-700 sm:text-5xl">成長回顧與感謝</h1>
        <p className="mx-auto mt-4 max-w-md font-body text-base text-brand-900/70">
          一路走來，謝謝陪我長大、陪我變成今天的我的你們。
        </p>
      </header>
      <MemoirTimeline />
    </main>
  )
}
