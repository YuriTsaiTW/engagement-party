/**
 * 時間軸主體：純裝飾用垂直線。aria-hidden 避免讀屏器干擾。
 * 手機靠左 (left-4)、桌機靠中欄左側 (sm:left-6)，與 MemoirTimeline 的 pl-12/sm:pl-16 對齊。
 */
export function TimelineSpine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-0 bottom-0 left-4 w-0.5 bg-brand-300/60 sm:left-6"
    />
  )
}
