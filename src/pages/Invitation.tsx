import { QRCodeSVG } from 'qrcode.react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

const VENUE_NAME = '安億 360'
const VENUE_ADDRESS = '708 臺南市安平區億載里安億路 360 號 3 樓'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${VENUE_NAME} ${VENUE_ADDRESS}`,
)}`

export default function Invitation() {
  return (
    <main className="invitation-print-page mx-auto max-w-4xl px-6 py-12 print:max-w-none print:px-0 print:py-0 sm:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-stretch md:gap-12 print:grid-cols-2 print:gap-4">
        <PhotoHero />
        <InfoColumn />
      </div>
    </main>
  )
}

function PhotoHero() {
  return (
    <section
      aria-label="婚攝照片"
      className="overflow-hidden rounded-xl border border-brand-100 bg-brand-50/40 print:break-inside-avoid print:rounded-none print:border-0"
    >
      <div
        role="img"
        aria-label="婚攝照片（待補，預計 2026/6/23 後提供）"
        className="flex h-full min-h-[24rem] items-center justify-center"
      >
        <span className="font-body text-sm text-brand-900/40">婚攝照片（待補）</span>
      </div>
    </section>
  )
}

function InfoColumn() {
  return (
    <div className="flex flex-col">
      <header className="text-center print:text-left">
        <p className="font-body text-xs uppercase tracking-[0.5em] text-brand-500 print:text-[0.65rem]">
          SAVE THE DATE
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-brand-700 sm:text-5xl print:mt-2 print:text-2xl">
          昱德(Lloyd)
          <span className="mx-2 text-brand-300">&amp;</span>
          秀慧(Yuri)
        </h1>
        <p className="mt-3 font-body text-sm text-brand-900/70 print:mt-1 print:text-xs">
          誠摯邀請您 共同參與我們的訂婚派對
        </p>
      </header>

      <div className="my-6 flex items-center justify-center gap-3 print:my-3">
        <span aria-hidden="true" className="h-px w-8 bg-brand-300" />
        <span className="font-body text-xs uppercase tracking-[0.4em] text-brand-500 sm:text-sm print:text-[0.7rem]">
          2026 · 09 · 26
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-brand-300" />
      </div>

      <section className="space-y-5 print:space-y-2">
        <InfoBlock label="日期">
          <p className="font-body text-base text-brand-900 print:text-xs">
            2026 年 9 月 26 日（六）
          </p>
        </InfoBlock>

        <InfoBlock label="時間">
          <p className="font-body text-base text-brand-900 print:text-xs">
            <span className="tabular-nums">13:30</span> 開放入場
            <span className="mx-1 text-brand-300">·</span>
            <span className="tabular-nums">14:00</span> 活動開始
          </p>
        </InfoBlock>

        <InfoBlock label="地點">
          <p className="font-display text-lg text-brand-700 print:text-sm">{VENUE_NAME}</p>
          <p className="font-body text-sm text-brand-900/70 print:text-[0.65rem]">
            {VENUE_ADDRESS}
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 font-body text-sm text-brand-500 underline-offset-4 hover:underline focus-visible:underline print:hidden"
          >
            在 Google 地圖開啟
            <span aria-hidden="true">→</span>
          </a>
        </InfoBlock>

        <InfoBlock label="停車資訊">
          <p className="font-body text-sm text-brand-900/80 print:text-[0.65rem]">
            場地周邊停車示意如下，建議提早抵達以利尋找車位。
          </p>
          <figure className="mt-2 overflow-hidden rounded-md border border-brand-100 bg-brand-50/50 print:mt-1 print:rounded-sm">
            <div
              role="img"
              aria-label="安億 360 停車示意圖（待補）"
              className="flex aspect-[4/3] items-center justify-center"
            >
              <span className="font-body text-xs text-brand-900/40">停車示意圖（待補）</span>
            </div>
          </figure>
        </InfoBlock>

        <PrintOnlyQrCode />
      </section>

      <footer className="mt-10 text-center print:hidden">
        <Link
          to="/"
          className="font-body text-sm text-brand-500 underline-offset-4 hover:underline focus-visible:underline"
        >
          ← 回首頁
        </Link>
      </footer>
    </div>
  )
}

function InfoBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1 print:space-y-0.5">
      <h2 className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-brand-500 print:text-[0.55rem]">
        {label}
      </h2>
      <div className="space-y-1 print:space-y-0">{children}</div>
    </div>
  )
}

function PrintOnlyQrCode() {
  const invitationUrl = `${window.location.origin}${import.meta.env.BASE_URL}invitation`
  return (
    <div className="hidden items-center gap-3 pt-2 print:flex">
      <QRCodeSVG
        value={invitationUrl}
        size={64}
        level="M"
        marginSize={1}
        aria-label="電子邀請函 QR Code"
      />
      <p className="font-body text-[0.6rem] leading-snug text-brand-900/70">
        掃描查看完整電子邀請函
        <br />
        含活動流程與最新資訊
      </p>
    </div>
  )
}
