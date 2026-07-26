import { MAPS_EMBED_URL, MAPS_URL, VENUE_NAME } from '../data/event'

/**
 * 場地位置地圖。iframe 無法列印，因此列印版改以文字地址 + QR Code 承接
 * （見 InvitationInfo 的地點區塊與 PrintOnlyQrCode）。
 */
export function VenueMap() {
  return (
    <section aria-labelledby="venue-map-heading" className="print:hidden">
      <h2
        id="venue-map-heading"
        className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-brand-500"
      >
        場地位置
      </h2>
      <div className="mt-2 overflow-hidden rounded-md border border-brand-100">
        <iframe
          title={`${VENUE_NAME} 位置地圖`}
          src={MAPS_EMBED_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="block h-72 w-full border-0 sm:h-80"
        />
      </div>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1 font-body text-sm text-brand-500 underline-offset-4 hover:underline focus-visible:underline"
      >
        在 Google 地圖開啟導航
        <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}
