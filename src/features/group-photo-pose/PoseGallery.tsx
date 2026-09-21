import { useEffect, useRef, useState } from 'react'
import { assetUrl, groupSizes, type Pose, poses } from './catalog'

function Thumbnail({ pose }: { pose: Pose }) {
  const [failed, setFailed] = useState(false)
  if (failed)
    return (
      <div className="flex min-h-40 items-center justify-center p-6 text-sm text-brand-700">
        圖片暫時無法載入
      </div>
    )
  return pose.crop ? (
    <div
      className="relative overflow-hidden"
      style={{ aspectRatio: `${pose.crop.width} / ${pose.crop.height}` }}
    >
      <img
        src={assetUrl(pose.image)}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="absolute left-0 h-auto max-w-none"
        style={{
          width: `${(pose.crop.fullWidth / pose.crop.width) * 100}%`,
          top: `${-((pose.crop.top ?? 0) / pose.crop.height) * 100}%`,
        }}
      />
    </div>
  ) : (
    <img
      src={assetUrl(pose.image)}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-auto w-full"
    />
  )
}

export function PoseGallery({
  onSelect,
  onBack,
  selectedId,
  storageError,
}: {
  onSelect: (pose: Pose) => void
  onBack: () => void
  selectedId?: string
  storageError: boolean
}) {
  const heading = useRef<HTMLHeadingElement>(null)
  const selectedButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    ;(selectedButton.current ?? heading.current)?.focus()
  }, [])

  return (
    <section className="mx-auto w-full max-w-7xl">
      <p className="mb-3 text-xs tracking-[0.3em] text-brand-700">POSE GALLERY</p>
      <h1
        ref={heading}
        tabIndex={-1}
        className="font-display text-4xl text-brand-900 outline-none sm:text-5xl"
      >
        素材牆
      </h1>
      <p className="mt-4 text-brand-900/70">每一張都是合照靈感，點選喜歡的圖片，直接開始擺拍。</p>
      <button
        type="button"
        onClick={onBack}
        className="my-6 min-h-12 rounded-full border border-brand-300 bg-white px-6 py-3 text-brand-700 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
      >
        返回選擇人數
      </button>
      {storageError && (
        <p role="alert" className="mb-6 text-brand-700">
          無法儲存抽選紀錄，請允許瀏覽器使用工作階段儲存空間後重新整理。
        </p>
      )}
      {groupSizes.map((people) => {
        const group = poses.filter((pose) => pose.people === people)
        if (!group.length) return null
        return (
          <section
            key={people}
            aria-labelledby={`gallery-group-${people}`}
            className="mb-10 text-left"
          >
            <h2
              id={`gallery-group-${people}`}
              className="mb-5 border-b border-brand-100 pb-3 font-display text-2xl text-brand-900"
            >
              {people} 人合照
            </h2>
            <div className="columns-2 gap-4 md:columns-3 xl:columns-4">
              {group.map((pose) => (
                <button
                  key={pose.id}
                  ref={pose.id === selectedId ? selectedButton : undefined}
                  type="button"
                  onClick={() => onSelect(pose)}
                  disabled={storageError}
                  aria-label={`查看 ${pose.people} 人姿勢：${pose.title}`}
                  className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-brand-100 bg-white text-left shadow-sm transition hover:border-brand-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 disabled:opacity-50"
                >
                  <Thumbnail pose={pose} />
                  <div className="p-3 sm:p-4">
                    <span className="text-xs text-brand-700">{pose.people} 人合照</span>
                    <p className="mt-1 font-display text-base leading-relaxed text-brand-900 sm:text-lg">
                      {pose.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )
      })}
    </section>
  )
}
