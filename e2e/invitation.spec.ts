import { expect, test } from '@playwright/test'

const MOBILE = { width: 375, height: 812 }
const DESKTOP = { width: 1280, height: 900 }

test('邀請函顯示標題、活動資訊與場地地圖', async ({ page }) => {
  await page.goto('invitation')

  await expect(page.getByRole('heading', { level: 1, name: /昱德.*秀慧/ })).toBeVisible()
  await expect(page.getByText('2026 年 9 月 26 日（六）')).toBeVisible()
  await expect(page.getByText('安億 360', { exact: true })).toBeVisible()
  await expect(page.getByText(/安億路 360 號 3 樓/)).toBeVisible()
  await expect(page.getByText(/不收禮金/)).toBeVisible()

  await expect(page.locator('iframe[title="安億 360 位置地圖"]')).toBeVisible()
})

test('按住封面圖切換為結婚書約插畫，放開後還原', async ({ page }) => {
  await page.setViewportSize(DESKTOP)
  await page.goto('invitation')

  const cover = page.getByRole('button', { name: /按住查看結婚書約插畫/ })
  const illust = page.getByAltText(/手繪插畫/)

  await expect(cover).toHaveAttribute('aria-pressed', 'false')
  await expect(illust).toHaveCSS('opacity', '0')

  // 桌機斷點載入直式插畫
  await expect(illust).toHaveJSProperty('naturalWidth', 970)

  await cover.hover()
  await page.mouse.down()
  await expect(cover).toHaveAttribute('aria-pressed', 'true')
  await expect(illust).toHaveCSS('opacity', '1')

  await page.mouse.up()
  // 移到右欄：左欄仍被 hover 時 group-hover 會讓插畫持續顯示（預期行為）
  await page.mouse.move(DESKTOP.width - 40, DESKTOP.height / 2)
  await expect(cover).toHaveAttribute('aria-pressed', 'false')
  await expect(illust).toHaveCSS('opacity', '0')
})

test('375px 一頁式載入橫式插畫', async ({ page }) => {
  await page.setViewportSize(MOBILE)
  await page.goto('invitation')
  await expect(page.getByAltText(/手繪插畫/)).toHaveJSProperty('naturalWidth', 1500)
})

test('375px 為一頁式：封面圖在資訊上方，且無水平溢出', async ({ page }) => {
  await page.setViewportSize(MOBILE)
  await page.goto('invitation')

  const cover = page.locator('main img').first()
  await expect(cover).toBeVisible()

  // 一頁式：封面圖底部在標題上方
  const coverBox = await cover.boundingBox()
  const headingBox = await page.getByRole('heading', { level: 1 }).boundingBox()
  if (!coverBox || !headingBox) throw new Error('封面圖或標題未取得 bounding box')
  expect(coverBox.y + coverBox.height).toBeLessThanOrEqual(headingBox.y)

  // 手機斷點載入橫幅版素材
  await expect(cover).toHaveJSProperty('naturalWidth', 1500)

  const overflow = await page.evaluate(
    () => document.body.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
})

test('1280px 為兩欄式：左欄撐滿 viewport 且滾動時固定，右欄可滾動', async ({ page }) => {
  await page.setViewportSize(DESKTOP)
  await page.goto('invitation')

  const left = page.locator('main > div').first()

  // 左欄高度等於 viewport，且不自行滾動
  const metrics = await left.evaluate((el) => ({
    height: el.getBoundingClientRect().height,
    position: getComputedStyle(el).position,
    overflow: getComputedStyle(el).overflow,
  }))
  expect(metrics.height).toBe(DESKTOP.height)
  expect(metrics.position).toBe('sticky')
  expect(metrics.overflow).toBe('hidden')

  // 桌機斷點透過 <picture> 換成直幅素材（1x／2x 皆為直幅，故以長寬比判斷不受 DPR 影響）
  const cover = page.locator('main img').first()
  const asset = await cover.evaluate((el: HTMLImageElement) => ({
    currentSrc: el.currentSrc,
    isPortrait: el.naturalHeight > el.naturalWidth,
  }))
  expect(asset.currentSrc).toContain('cover-desktop')
  expect(asset.isPortrait).toBe(true)

  // 頁面可滾動（右欄內容較長），左欄滾動後仍貼齊頂端
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  expect(scrollHeight).toBeGreaterThan(DESKTOP.height)

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  const topAfterScroll = await left.evaluate((el) => el.getBoundingClientRect().top)
  expect(Math.abs(topAfterScroll)).toBeLessThan(2)
})
