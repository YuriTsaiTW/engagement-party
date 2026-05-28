import { resolvePhoto } from '../data/photos'
import type { Photo } from '../types'

/**
 * 通用照片元件：figure + lazy img + 選填 figcaption。
 * 給「附加照片」用，封面照片在 RecipientCard 直接用 <img> 才能對到
 * shadcn Card 的 first-child rounded-t-xl 規則。
 */
export function PhotoFigure({ photo, className }: { photo: Photo; className?: string }) {
  return (
    <figure className={className}>
      <img
        src={resolvePhoto(photo.src)}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="block aspect-square w-full rounded-md object-cover"
      />
      {photo.caption && (
        <figcaption className="mt-1 font-body text-xs text-brand-900/60">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  )
}
