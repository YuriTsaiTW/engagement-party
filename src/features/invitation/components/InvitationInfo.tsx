import { QRCodeSVG } from 'qrcode.react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { MAPS_URL, NOTES, VENUE_ADDRESS, VENUE_NAME } from '../data/event'
import { VenueMap } from './VenueMap'

/** 標題（含新人姓名與日期橫線）。 */
export function InvitationHeading() {
  return (
    <>
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
    </>
  )
}

/** 活動資訊（日期／時間／地點／注意事項）+ 地圖 + 列印用 QR Code。 */
export function InvitationDetails() {
  return (
    <section className="space-y-5 print:space-y-2">
      <InfoBlock label="日期">
        <p className="font-body text-base text-brand-900 print:text-xs">2026 年 9 月 26 日（六）</p>
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
        <p className="font-body text-sm text-brand-900/70 print:text-[0.65rem]">{VENUE_ADDRESS}</p>
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

      <InfoBlock label="注意事項">
        <ul className="space-y-1 font-body text-sm text-brand-900/80 print:space-y-0 print:text-[0.65rem]">
          {NOTES.map((note) => (
            <li key={note} className="flex gap-2">
              <span aria-hidden="true" className="select-none text-brand-300">
                ·
              </span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </InfoBlock>

      <VenueMap />

      <PrintOnlyQrCode />
    </section>
  )
}

/** 回首頁（列印時隱藏）。 */
export function InvitationFooter() {
  return (
    <footer className="mt-10 text-center print:hidden">
      <Link
        to="/"
        className="font-body text-sm text-brand-500 underline-offset-4 hover:underline focus-visible:underline"
      >
        ← 回首頁
      </Link>
    </footer>
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
