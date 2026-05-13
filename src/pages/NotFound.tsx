import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-7xl text-brand-700">404</p>
      <h1 className="font-display text-2xl text-brand-900">找不到頁面</h1>
      <Link
        to="/"
        className="text-brand-500 underline-offset-4 hover:underline focus-visible:underline"
      >
        回到首頁
      </Link>
    </main>
  )
}
