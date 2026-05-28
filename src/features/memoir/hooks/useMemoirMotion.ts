import type { Variants } from 'motion/react'
import { useReducedMotion } from 'motion/react'

/**
 * 由 reduced 旗標純函式產生 variants，方便單元測試（不必碰 matchMedia / effect timing）。
 *
 * - 開啟 reduced-motion 時位移歸零、duration 為 0，元素仍會顯示，避免閃爍或殘留。
 */
export function buildMemoirVariants(reduced: boolean): {
  sectionVariants: Variants
  cardVariants: Variants
} {
  const sectionDistance = reduced ? 0 : 24
  const cardDistance = reduced ? 0 : 12

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: sectionDistance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.6, ease: 'easeOut' },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: cardDistance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.5, ease: 'easeOut' },
    },
  }

  return { sectionVariants, cardVariants }
}

/**
 * 統一 memoir 模組的進場 motion variants。
 *
 * - 尊重 prefers-reduced-motion：透過 Motion 的 useReducedMotion 取得旗標
 *   （首次 render 可能回 null，視為非 reduced）。
 * - whileInView 的視窗觀察設定請由 caller 自行帶 viewport={{ once: true }}。
 */
export function useMemoirMotion(): {
  sectionVariants: Variants
  cardVariants: Variants
  reduced: boolean
} {
  const reducedMaybe = useReducedMotion()
  const reduced = reducedMaybe ?? false
  return { ...buildMemoirVariants(reduced), reduced }
}
