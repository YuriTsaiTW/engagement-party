import { Link } from 'react-router'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-body text-sm uppercase tracking-[0.4em] text-brand-500">2026 · 09 · 26</p>
      <h1 className="font-display text-5xl text-brand-700 sm:text-6xl">
        昱德(Lloyd) &amp; 秀慧(Yuri)
      </h1>
      <p className="max-w-md font-body text-base text-brand-900/70">
        歡迎來到我們的訂婚派對現場互動頁。播放音樂、跟著流程、和大家一起玩遊戲。
      </p>
      <Link
        to="/memoir"
        className="mt-2 font-body text-sm text-brand-500 underline-offset-4 hover:underline focus-visible:underline"
      >
        成長回顧與感謝 →
      </Link>
    </main>
  )
}
