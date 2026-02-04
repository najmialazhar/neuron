import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.62.180.28/idmtdev/public/idmt');
  await page.getByRole('link', { name: 'Order ' }).click();
  await page.getByRole('link', { name: 'Manage Status' }).click();
  await page.locator('tr:nth-child(3) > td:nth-child(4) > .btn-group > .btn.btn-sm.btn-primary').click();
});