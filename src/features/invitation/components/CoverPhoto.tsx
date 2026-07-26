import coverDesktop2x from '../assets/cover-desktop@2x.jpg'
import coverDesktop from '../assets/cover-desktop.jpg'
import coverMobile from '../assets/cover-mobile.jpg'

const ALT = '昱德與秀慧的婚紗照，兩人在紅磚建築的光影迴廊中'

/**
 * 封面照片。<768px 用橫幅裁切、≥768px 用直幅撐滿左欄，
 * 兩種構圖差異太大無法靠 object-fit 共用同一張，因此用 <picture> 依斷點換圖，
 * 讓瀏覽器只下載當前斷點需要的那一張。
 */
export function CoverPhoto() {
  return (
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
        alt={ALT}
        width={1500}
        height={1000}
        fetchPriority="high"
        decoding="async"
        /**
         * 桌機左欄裁切方式隨視窗比例改變，62% 35% 兩種情況都保得住新人：
         * - 寬視窗（如 1280×900）：垂直裁切，35% 上移讓人物落在視覺中心
         * - 窄視窗（剛好 768px）：轉為水平裁切，62% 右移避免新娘被切掉
         */
        className="block h-full w-full object-cover object-center md:object-[62%_35%]"
      />
    </picture>
  )
}
