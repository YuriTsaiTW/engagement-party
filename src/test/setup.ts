import '@testing-library/jest-dom/vitest'

// jsdom 沒有 IntersectionObserver；Motion 的 whileInView 與 inView 觀察器都會用到。
// 用單純的 class（不宣告 implements，避免 TS lib 介面欄位漂移），最後 cast 給全域。
class MockIntersectionObserver {
  root: Element | Document | null = null
  rootMargin = ''
  scrollMargin = ''
  thresholds: readonly number[] = []
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// jsdom 沒有 matchMedia；Motion 的 useReducedMotion 與本模組的 reduced-motion 測試會用到。
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}

// Node 24 與 jsdom 29 都提供 globalThis.crypto.subtle；若日後降版會在此補 polyfill。
