import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { resolvePhoto } from '../data/photos'
import { useMemoirMotion } from '../hooks/useMemoirMotion'
import type { Recipient } from '../types'
import { PhotoFigure } from './PhotoFigure'

/**
 * 單一賓客的感謝卡。
 *
 * 沿用 shadcn Card：第一張照片放成 Card 的 first-child <img>，自動取得
 * rounded-t-xl 封面與去除上 padding（見 src/components/ui/card.tsx:15）。
 * 額外照片走 PhotoFigure grid。
 */
export function RecipientCard({ recipient }: { recipient: Recipient }) {
  const { cardVariants } = useMemoirMotion()
  const cover = recipient.photos[0]
  const rest = recipient.photos.slice(1)

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card>
        {cover ? (
          <img
            src={resolvePhoto(cover.src)}
            alt={cover.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        ) : null}
        <CardHeader>
          <CardTitle>
            <span className="font-display text-2xl text-brand-700 sm:text-3xl">
              致 {recipient.name}
            </span>
          </CardTitle>
          {recipient.relationLabel ? (
            <p className="font-body text-xs uppercase tracking-[0.25em] text-brand-500">
              {recipient.relationLabel}
            </p>
          ) : null}
        </CardHeader>
        <CardContent>
          <div className="space-y-3 pb-4 font-body text-base leading-relaxed text-brand-900/80">
            {recipient.message.map((para, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: 靜態 message 段落，不會 reorder
              <p key={`${recipient.id}-msg-${i}`}>{para}</p>
            ))}
          </div>
          {rest.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 pb-4 sm:grid-cols-3">
              {rest.map((p, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: 靜態相片陣列，不會 reorder
                <PhotoFigure key={`${recipient.id}-photo-${i}`} photo={p} className="m-0" />
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.article>
  )
}
