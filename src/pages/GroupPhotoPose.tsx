import { Camera, Heart, Images, RotateCcw, Smile, Users } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  assetUrl,
  groupSizes,
  historyKey,
  type Pose,
  poses,
  readHistory,
} from '../features/group-photo-pose/catalog'
import { kidsPoseNotes } from '../features/group-photo-pose/kids'
import { PoseGallery } from '../features/group-photo-pose/PoseGallery'

const actionClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-700 px-8 py-3 font-body text-white transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 disabled:opacity-40'

function PoseResult({
  pose,
  restart,
  kidsMode,
  backToGallery,
}: {
  pose: Pose
  restart: () => void
  kidsMode: boolean
  backToGallery?: () => void
}) {
  const audio = useRef<HTMLAudioElement>(null)
  const [audioMessage, setAudioMessage] = useState('')
  const [imageFailed, setImageFailed] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const play = useCallback(() => {
    setAudioMessage('')
    const element = audio.current
    if (!element) return
    element.currentTime = 0
    void element.play().catch(() => setAudioMessage('音訊尚未播放，請點「播放音檔」再試一次。'))
  }, [])

  useEffect(() => {
    heading.current?.focus()
    play()
    const element = audio.current
    return () => element?.pause()
  }, [play])

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5">
      <p className="text-sm tracking-widest text-brand-700">
        {kidsMode ? '小朋友區 · ' : ''}
        {pose.people} 人合照 · 就是這個姿勢！
      </p>
      <h1
        ref={heading}
        tabIndex={-1}
        className="font-display text-3xl leading-relaxed text-brand-900 outline-none sm:text-4xl"
      >
        {pose.title}
      </h1>
      {kidsMode && kidsPoseNotes[pose.id] && (
        <p className="max-w-xl text-sm leading-relaxed text-brand-900/80">
          {kidsPoseNotes[pose.id]?.tip}
        </p>
      )}
      <div className="flex min-h-64 w-full items-center justify-center rounded-3xl border border-brand-100 bg-white p-3 shadow-sm sm:p-5">
        {imageFailed ? (
          <p role="alert" className="p-10 text-brand-900">
            圖片無法載入，請確認素材檔案後重新整理。
          </p>
        ) : pose.crop ? (
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              width: `min(100%, calc(60dvh * ${pose.crop.width} / ${pose.crop.height}))`,
              aspectRatio: `${pose.crop.width} / ${pose.crop.height}`,
            }}
          >
            <img
              src={assetUrl(pose.image)}
              alt={pose.title}
              onError={() => setImageFailed(true)}
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
            alt={pose.title}
            onError={() => setImageFailed(true)}
            className="max-h-[60dvh] w-full rounded-2xl object-contain"
          />
        )}
      </div>
      {pose.audio.trim() && (
        <>
          {/* biome-ignore lint/a11y/useMediaCaption: Optional pose sound; the title and image provide the complete posing instruction. */}
          <audio
            ref={audio}
            src={assetUrl(pose.audio)}
            preload="auto"
            onError={() => setAudioMessage('音檔無法載入，請確認素材檔案。')}
          />
          <p role="status" className="text-sm text-brand-900/70">
            {audioMessage}
          </p>
        </>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        {backToGallery && (
          <button
            type="button"
            onClick={backToGallery}
            className="min-h-12 rounded-full border border-brand-300 px-6 text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            返回素材牆
          </button>
        )}
        <button type="button" onClick={restart} className={actionClass}>
          <RotateCcw size={18} aria-hidden="true" />
          重新開始
        </button>
        {pose.audio.trim() && (
          <button
            type="button"
            onClick={play}
            className="min-h-12 rounded-full border border-brand-300 px-6 text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            播放音檔
          </button>
        )}
      </div>
    </section>
  )
}

export default function GroupPhotoPose() {
  const [kidsMode, setKidsMode] = useState(false)
  const pool = useMemo(
    () => (kidsMode ? poses.filter((pose) => kidsPoseNotes[pose.id]) : poses),
    [kidsMode],
  )
  const [storageError, setStorageError] = useState(false)
  const [phase, setPhase] = useState<'choose' | 'drawing' | 'result' | 'gallery'>('choose')
  const [fromGallery, setFromGallery] = useState(false)
  const [selected, setSelected] = useState<Pose | null>(null)
  const pending = useRef<Pose | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    try {
      readHistory()
    } catch {
      setStorageError(true)
    }
  }, [])

  const reveal = useCallback(() => {
    const pose = pending.current
    if (!pose) return
    pending.current = null
    try {
      const shown = readHistory()
      const groupIds = new Set(
        pool.filter((item) => item.people === pose.people).map((item) => item.id),
      )
      const exhausted = [...groupIds].every((id) => shown.includes(id))
      const retained = exhausted ? shown.filter((id) => !groupIds.has(id)) : shown
      const next = [...new Set([...retained, pose.id])]
      sessionStorage.setItem(historyKey, JSON.stringify(next))
      setSelected(pose)
      setPhase('result')
    } catch {
      setStorageError(true)
      setPhase('choose')
    }
  }, [pool])

  useEffect(() => {
    if (phase !== 'drawing') return
    const timeout = window.setTimeout(reveal, 1800)
    return () => window.clearTimeout(timeout)
  }, [phase, reveal])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Changing areas must also focus and announce the updated heading.
  useEffect(() => {
    if (phase !== 'result') heading.current?.focus()
  }, [phase, kidsMode])

  function draw(people: number) {
    if (pending.current || storageError) return
    try {
      const shown = readHistory()
      const group = pool.filter((pose) => pose.people === people)
      const unseen = group.filter((pose) => !shown.includes(pose.id))
      const available = unseen.length ? unseen : group
      if (!available.length) return
      pending.current = available[Math.floor(Math.random() * available.length)] ?? null
      setPhase('drawing')
    } catch {
      setStorageError(true)
    }
  }

  function selectFromGallery(pose: Pose) {
    try {
      const next = [...new Set([...readHistory(), pose.id])]
      sessionStorage.setItem(historyKey, JSON.stringify(next))
      setSelected(pose)
      setFromGallery(true)
      setPhase('result')
    } catch {
      setStorageError(true)
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-brand-50 px-5 py-8 text-center font-body sm:px-10 sm:py-12">
      <header className="mb-8 flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-brand-700">
        <Heart size={14} aria-hidden="true" /> LLOYD &amp; YURI · 2026.09.26
      </header>
      <div className="flex flex-1 flex-col justify-center">
        {phase === 'result' && selected ? (
          <PoseResult
            key={selected.id}
            pose={selected}
            kidsMode={kidsMode}
            backToGallery={fromGallery ? () => setPhase('gallery') : undefined}
            restart={() => {
              setSelected(null)
              setFromGallery(false)
              setPhase('choose')
            }}
          />
        ) : phase === 'gallery' ? (
          <PoseGallery
            onSelect={selectFromGallery}
            selectedId={selected?.id}
            storageError={storageError}
            onBack={() => {
              setSelected(null)
              setFromGallery(false)
              setPhase('choose')
            }}
          />
        ) : phase === 'drawing' ? (
          <section className="flex flex-col items-center gap-7" aria-live="polite">
            <p className="text-sm tracking-widest text-brand-700">
              {kidsMode ? '小朋友區 · ' : ''}
              {pending.current?.people} 人合照
            </p>
            <div className="relative flex size-52 items-center justify-center sm:size-64">
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-spin rounded-full border-[18px] border-brand-100 border-t-brand-500 border-r-brand-300 motion-reduce:animate-none"
              />
              <Camera size={56} strokeWidth={1.2} className="text-brand-700" aria-hidden="true" />
            </div>
            <h1
              ref={heading}
              tabIndex={-1}
              className="font-display text-3xl text-brand-900 outline-none"
            >
              挑一個有趣的姿勢⋯
            </h1>
            <button type="button" onClick={reveal} className={actionClass}>
              略過
            </button>
          </section>
        ) : (
          <section className="mx-auto w-full max-w-3xl">
            <Camera
              className="mx-auto mb-5 text-brand-700"
              size={36}
              strokeWidth={1.3}
              aria-hidden="true"
            />
            <p className="mb-3 text-xs tracking-[0.3em] text-brand-700">STRIKE A POSE</p>
            <h1
              ref={heading}
              tabIndex={-1}
              className="font-display text-4xl leading-relaxed text-brand-900 outline-none sm:text-5xl"
            >
              {kidsMode ? '小朋友區' : '一起留下特別的回憶'}
            </h1>
            <p className="mt-4 text-brand-900/70">
              {kidsMode
                ? '可愛角色、簡單手勢，和大朋友一起開心擺拍！'
                : '這張合照有幾位？選好人數，讓我們幫你挑姿勢。'}
            </p>
            <p className="mt-2 text-sm text-brand-900/60">請把新郎、新娘也算進去喔！</p>
            <div className="flex flex-wrap items-center justify-center gap-x-3">
              <button
                type="button"
                onClick={() => setKidsMode(!kidsMode)}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-300 bg-white px-6 py-3 text-brand-700 transition hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
              >
                <Smile size={20} aria-hidden="true" />
                {kidsMode ? '返回全部姿勢' : '小朋友區'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setKidsMode(false)
                  setSelected(null)
                  setPhase('gallery')
                }}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-300 bg-white px-6 py-3 text-brand-700 transition hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
              >
                <Images size={20} aria-hidden="true" />
                素材牆
              </button>
            </div>
            {storageError && (
              <p role="alert" className="mt-5 text-brand-700">
                無法儲存抽選紀錄，請允許瀏覽器使用工作階段儲存空間後重新整理，再開始抽選。
              </p>
            )}
            <div className="my-9 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {groupSizes.map((people) => {
                const total = pool.filter((pose) => pose.people === people).length
                return (
                  <button
                    key={people}
                    type="button"
                    onClick={() => draw(people)}
                    disabled={!total || storageError}
                    className="group flex min-h-40 flex-col items-center justify-center gap-3 rounded-3xl border border-brand-100 bg-white px-4 py-6 text-brand-900 shadow-sm transition enabled:hover:-translate-y-1 enabled:hover:border-brand-500 enabled:hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 disabled:opacity-50"
                  >
                    <Users
                      size={22}
                      strokeWidth={1.3}
                      aria-hidden="true"
                      className="text-brand-700"
                    />
                    <span>
                      <span className="font-display text-4xl">{people}</span>
                      <span className="ml-2 text-sm">人</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
