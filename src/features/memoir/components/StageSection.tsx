import { motion } from 'motion/react'
import { useMemoirMotion } from '../hooks/useMemoirMotion'
import type { Stage } from '../types'
import { RecipientCard } from './RecipientCard'

/**
 * 一個成長階段：時間軸節點圓點 + era 標籤 + h2 主標 + 自述段落 + 賓客清單。
 *
 * 父層 MemoirTimeline 帶 pl-12 / sm:pl-16，TimelineSpine 對齊在 left-4 / sm:left-6；
 * 此處節點圓點 -left-[26px] / sm:-left-[34px] 視覺上剛好落在 spine 上方。
 */
export function StageSection({ stage }: { stage: Stage }) {
  const { sectionVariants } = useMemoirMotion()
  const headingId = `stage-${stage.id}-title`

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="relative"
      aria-labelledby={headingId}
    >
      {/* 時間軸節點圓點，純裝飾 */}
      <span
        aria-hidden="true"
        className="absolute top-2 -left-[26px] block size-3 rounded-full bg-brand-500 ring-4 ring-background sm:-left-[34px]"
      />
      <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-500">{stage.era}</p>
      <h2 id={headingId} className="mt-2 font-display text-3xl text-brand-700 sm:text-4xl">
        {stage.title}
      </h2>
      <div className="mt-4 space-y-3 font-body text-base leading-relaxed text-brand-900/80">
        {stage.narrative.map((para, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: 靜態 narrative 段落，不會 reorder
          <p key={`${stage.id}-narrative-${i}`}>{para}</p>
        ))}
      </div>
      <ul className="mt-8 list-none space-y-6 p-0">
        {stage.recipients.map((r) => (
          <li key={r.id}>
            <RecipientCard recipient={r} />
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
