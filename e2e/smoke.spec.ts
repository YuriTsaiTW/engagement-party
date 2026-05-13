import { expect, test } from '@playwright/test'

test('首頁顯示派對標題', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /訂婚派對/ })).toBeVisible()
})
