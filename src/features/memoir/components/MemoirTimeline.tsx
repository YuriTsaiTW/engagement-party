import { orderedStages } from '../data/stages'
import { StageSection } from './StageSection'
import { TimelineSpine } from './TimelineSpine'

/**
 * 時間軸容器：相對定位包住 TimelineSpine 與所有 StageSection。
 * pl-12 / sm:pl-16 為節點與線預留空間。
 */
export function MemoirTimeline() {
  return (
    <div className="relative space-y-24 pl-12 sm:pl-16">
      <TimelineSpine />
      {orderedStages.map((stage) => (
        <StageSection key={stage.id} stage={stage} />
      ))}
    </div>
  )
}
