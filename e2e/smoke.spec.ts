import { expect, test } from '@playwright/test'

test('首頁顯示新人姓名標題', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /昱德.*Lloyd.*秀慧.*Yuri/ })).toBeVisible()
})
