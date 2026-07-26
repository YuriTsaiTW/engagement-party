import { CoverPhoto } from '../features/invitation/components/CoverPhoto'
import {
  InvitationDetails,
  InvitationFooter,
  InvitationHeading,
} from '../features/invitation/components/InvitationInfo'

/**
 * 邀請函頁面。斷點 768px（Tailwind `md`）：
 * - <768px：一頁式，由上到下 封面圖 → 標題 → 活動資訊 → 地圖
 * - ≥768px：兩欄式，左欄封面照 sticky 撐滿 viewport 高度不滾動，右欄隨頁面滾動
 *
 * 列印時（A6 明信片）維持既有雙欄版型；該 grid 由 index.css 的 @media print
 * 統一定義，因此這裡刻意不加 print: 的 display 類別，避免兩者相互覆蓋。
 */
export default function Invitation() {
  return (
    <main className="invitation-print-page md:grid md:grid-cols-2 md:items-start print:max-w-none">
      {/* 左欄／手機封面：md 以上 sticky 撐滿 viewport 且不滾動 */}
      <div className="md:sticky md:top-0 md:h-dvh md:overflow-hidden print:static print:h-auto print:overflow-visible">
        <div className="aspect-[3/2] w-full md:h-full md:aspect-auto print:aspect-[3/2] print:h-auto">
          <CoverPhoto />
        </div>
      </div>

      {/* 右欄／手機下半部：正常流，隨頁面滾動 */}
      <div className="mx-auto flex w-full max-w-xl flex-col px-6 py-10 md:py-16 print:max-w-none print:px-0 print:py-0">
        <InvitationHeading />
        <InvitationDetails />
        <InvitationFooter />
      </div>
    </main>
  )
}
