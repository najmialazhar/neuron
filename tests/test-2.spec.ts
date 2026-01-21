import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.62.180.28/idmtdev/public/idmt');
  await page.getByRole('link', { name: 'Dokumen ' }).click();
  await page.getByRole('link', { name: 'Kelola Dokumen' }).click();
  await expect(page.getByRole('heading')).toContainText('Kelola Dokumen');
});