import MemoirGate from '@/features/memoir/MemoirGate'

/**
 * /memoir route element。維持 pages/ 作為路由薄 wrapper、features/ 放實際邏輯
 * 的既有分層慣例。實際內容（含口令 Gate 與 lazy 內容）在 features/memoir/。
 */
export default function MemoirPage() {
  return <MemoirGate />
}
