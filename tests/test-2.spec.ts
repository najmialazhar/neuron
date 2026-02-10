import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.62.180.28/idmtdev/public/idmt');
  await page.getByRole('link', { name: 'Notification ' }).click();
  await page.getByRole('link', { name: 'Notification Template' }).click();
  await page.getByRole('link', { name: 'Notification Email' }).click();
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('button', { name: 'Cancel' }).click();



  await page.getByRole('link', { name: 'Notification Profile' }).click();
  await expect(page.getByLabel('Name: activate to sort column')).toContainText('Name');


  await page.getByRole('searchbox', { name: 'Cari:' }).click();
  await page.getByRole('searchbox', { name: 'Cari:' }).fill('Telkom');
  await expect(page.getByRole('cell', { name: 'Telkom' }).first()).toBeVisible();


  await page.getByRole('cell', { name: 'Tidak ada data yang tersedia' }).click();
  await expect(page.getByRole('cell')).toContainText('Tidak ada data yang tersedia pada tabel ini');




  await page.getByRole('button', { name: 'New Profile' }).click();
  await page.locator('#profile_name').fill('Playwrighttest');
  await page.locator('#email').fill('playwrighttest@gmail.com');
  await page.getByRole('button', { name: 'Create Configuration' }).click();
  await page.locator('#name').fill('pwtest');
  await page.locator('#host').fill('pwtest');
  await page.locator('#port').fill('pwtest');
  await page.locator('#connection_class').fill('pwtest');
  await page.locator('#ssl').fill('pwtest');
  await page.locator('#username').fill('pwtest');
  await page.locator('#password').fill('pwtest');
  await page.locator('#configModal').getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#modal-title')).toContainText('New Profile');


  await page.locator('#notif_profile_type_id').selectOption('2');

  await page.locator('#notif_profile_type_id').selectOption('2');
});