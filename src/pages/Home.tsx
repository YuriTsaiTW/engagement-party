import { Link } from 'react-router'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-body text-sm uppercase tracking-[0.4em] text-brand-500">2026 · 09 · 26</p>
      <h1 className="font-display text-5xl text-brand-700 sm:text-6xl">
        昱德(Lloyd) &amp; 秀慧(Yuri)
      </h1>
      {/* 斷行固定在「時間，」之後：兩個子句各自成行，語意才不會被切斷 */}
      <p className="max-w-xl font-body text-base leading-relaxed text-brand-900/70">
        <span className="block">醞釀了 12 年，我們想用一個下午的時間，</span>
        <span className="block">以新鮮的身份跟大家敘舊和分享喜悅</span>
      </p>
      <nav className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-sm">
        <Link
          to="/invitation"
          className="text-brand-500 underline-offset-4 hover:underline focus-visible:underline"
        >
          邀請函 →
        </Link>
        <Link
          to="/memoir"
          className="text-brand-500 underline-offset-4 hover:underline focus-visible:underline"
        >
          成長回顧與感謝 →
        </Link>
      </nav>
    </main>
  )
}
