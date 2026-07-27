import { useCallback, useState } from 'react'
import coverDesktop2x from '../assets/cover-desktop@2x.jpg'
import coverDesktop from '../assets/cover-desktop.jpg'
import coverMobile from '../assets/cover-mobile.jpg'
import illustDesktop from '../assets/illust-desktop.jpg'
import illustMobile from '../assets/illust-mobile.jpg'

const PHOTO_ALT = '昱德與秀慧的婚紗照，兩人在紅磚建築的光影迴廊中'
const ILLUST_ALT = '結婚書約上的手繪插畫，昱德與秀慧牽著手，新娘手持花束'

/**
 * 封面照片：按住（或桌機滑鼠移入）時切換成結婚書約的手繪插畫，放開即還原。
 *
 * - 兩張圖同時存在於 DOM 並以 opacity 交叉淡入，避免首次按下才載入而閃爍
 * - 用 Pointer Events 統一處理滑鼠／觸控／觸控筆，不需分別掛 mouse 與 touch
 * - 以 <button> 實作，鍵盤 Space／Enter 聚焦後同樣可切換（見 onKeyDown/onKeyUp）
 * - <768px 用橫式素材、≥768px 用直式，與照片的斷點切換一致
 */
export function CoverPhoto() {
  const [revealed, setRevealed] = useState(false)

  const show = useCallback(() => setRevealed(true), [])
  const hide = useCallback(() => setRevealed(false), [])

  // 鍵盤操作：按住 Space／Enter 顯示插畫，放開還原（與指標行為一致）
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      setRevealed(true)
    }
  }, [])
  const onKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') setRevealed(false)
  }, [])

  return (
    <button
      type="button"
      aria-pressed={revealed}
      aria-label="按住查看結婚書約插畫"
      onPointerDown={show}
      onPointerUp={hide}
      onPointerLeave={hide}
      onPointerCancel={hide}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={hide}
      onContextMenu={(e) => e.preventDefault()}
      className="group relative block h-full w-full cursor-pointer overflow-hidden bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-500"
    >
      <picture>
        {/* 左欄約佔半個 viewport，在 Retina 上 1x 素材會被放大，因此另備 2x（僅 HiDPI 下載） */}
        <source
          media="(min-width: 768px)"
          srcSet={`${coverDesktop} 1x, ${coverDesktop2x} 2x`}
          width={1133}
          height={1700}
        />
        <img
          src={coverMobile}
          alt={PHOTO_ALT}
          width={1500}
          height={1000}
          fetchPriority="high"
          decoding="async"
          /**
           * 桌機左欄裁切方式隨視窗比例改變，62% 35% 兩種情況都保得住新人：
           * - 寬視窗（如 1280×900）：垂直裁切，35% 上移讓人物落在視覺中心
           * - 窄視窗（剛好 768px）：轉為水平裁切，62% 右移避免新娘被切掉
           */
          className="block h-full w-full object-cover object-center transition-opacity duration-300 ease-out md:object-[62%_35%]"
        />
      </picture>

      {/*
       * 插畫疊在照片之上。用 object-contain 完整呈現（水彩畫的留白是構圖的一部分，
       * object-cover 在直式欄位會裁掉約 20% 高度、切到頭腳）；素材已合成 brand-50
       * 底色且按鈕底色相同，因此留白區看不出接縫。
       */}
      <picture>
        <source media="(min-width: 768px)" srcSet={illustDesktop} width={970} height={1700} />
        <img
          src={illustMobile}
          alt={ILLUST_ALT}
          width={1500}
          height={759}
          loading="lazy"
          decoding="async"
          aria-hidden={!revealed}
          /* group-hover 已被 Tailwind 包在 @media(hover:hover) 內，觸控裝置不會卡住不還原 */
          className={`absolute inset-0 block h-full w-full bg-brand-50 object-contain object-center transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            revealed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        />
      </picture>
    </button>
  )
}
