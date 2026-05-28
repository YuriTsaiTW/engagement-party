import { expect, test } from '@playwright/test'

const PLACEHOLDER_PASS = 'lloyd-yuri-2026'

test('未輸入口令時擋在 Gate', async ({ page }) => {
  await page.goto('/memoir')
  await expect(page.getByRole('heading', { name: /回顧頁面/ })).toBeVisible()
  await expect(page.getByLabel('口令')).toBeVisible()
})

test('輸入正確口令後進入回顧並看見爸爸的卡片', async ({ page }) => {
  await page.goto('/memoir')
  await page.getByLabel('口令').fill(PLACEHOLDER_PASS)
  await page.getByRole('button', { name: /進入回顧/ }).click()

  await expect(page.getByRole('heading', { name: /成長回顧與感謝/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: /在原生家庭裡學會被愛/ })).toBeVisible()
  await expect(page.getByText(/致 爸爸/)).toBeVisible()
  await expect(page.getByAltText(/與爸爸的合影/)).toBeVisible()
})

test('錯誤口令不解鎖且顯示錯誤訊息', async ({ page }) => {
  await page.goto('/memoir')
  await page.getByLabel('口令').fill('wrong-pass')
  await page.getByRole('button', { name: /進入回顧/ }).click()
  await expect(page.getByText(/口令不正確/)).toBeVisible()
  await expect(page.getByLabel('口令')).toBeVisible()
})

test('首頁可導向 /memoir', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /成長回顧與感謝/ }).click()
  await expect(page.getByRole('heading', { name: /回顧頁面/ })).toBeVisible()
})
