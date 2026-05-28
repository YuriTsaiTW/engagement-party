import type { Stage } from '../types'

/**
 * 成長階段資料。
 *
 * Pilot 範圍：只放童年（爸爸）一筆 + **佔位**內容，先鎖視覺語言。
 * 其餘 7 階段（小學、中學、高中、大學、研究所、優派、親戚）依時間序在
 * stages 陣列尾端追加即可，元件層自動沿用同一套渲染。
 */
export const stages: Stage[] = [
  {
    id: 'childhood',
    order: 1,
    era: '1995 — 2001 · 童年',
    title: '在原生家庭裡學會被愛',
    narrative: [
      '（佔位文字）童年是色彩最濃的一段。我在那個小小的家裡學到，原來愛可以這麼穩定地接住一個人。',
      '（佔位文字）那時候我還不懂感謝，只知道家永遠開著一盞燈，等我回去。',
    ],
    recipients: [
      {
        id: 'dad',
        name: '爸爸',
        relationLabel: '原生家庭',
        photos: [
          {
            src: 'dad-placeholder.svg',
            alt: '與爸爸的合影（佔位圖）',
          },
        ],
        message: [
          '（佔位感謝詞）謝謝你示範了什麼是負責任的男人。你從來不說大道理，但每一個動作都讓我看到一個爸爸可以怎麼撐起一個家。',
          '（佔位感謝詞）長大才慢慢懂你的沉默裡藏了多少擔心，懂你揉著肩膀走出公司大門的背影，是怎麼把我撐到今天。',
          '（佔位感謝詞）爸，今天，換我來告訴你：我很好，因為有你。謝謝你。',
        ],
      },
    ],
  },
  // ──────────────────────────────────────────
  // 後續階段插入位置（依時間序）：
  //   order 2 : 小學同學      (id: 'elementary')
  //   order 3 : 中學同學      (id: 'middle-school')
  //   order 4 : 高中排球球友   (id: 'high-school')
  //   order 5 : 大學同學      (id: 'university')
  //   order 6 : 研究所同學    (id: 'graduate')
  //   order 7 : 優派同事      (id: 'viewsonic')
  // 親戚（大姑、阿姨、叔叔）可視為童年延伸，或獨立節點，待討論。
  // ──────────────────────────────────────────
]

export const orderedStages: readonly Stage[] = [...stages].sort((a, b) => a.order - b.order)

export const stagesById: Record<string, Stage> = Object.fromEntries(
  stages.map((s) => [s.id, s] as const),
)
