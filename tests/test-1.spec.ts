import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.62.180.28/idmtdev/public/idmt');
  await page.getByRole('link', { name: 'Organisasi ' }).click();
  await page.getByRole('link', { name: 'Manage Position' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');


  await page.getByRole('textbox', { name: 'Search' }).fill('Default');
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');



  await page.getByRole('button', { name: 'Buat baru' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill('Playwright-Testing');
  await page.getByRole('spinbutton', { name: 'Level *' }).click();
  await page.getByRole('spinbutton', { name: 'Level *' }).fill('5');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('dialog')).toContainText('Playwright-Testing success added!');
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');


  await expect(page.locator('#level-error')).toContainText('Please insert level');
  await expect(page.locator('#title-error')).toContainText('Please insert title');


  await page.getByRole('button', { name: 'Buat baru' }).click();
  await page.getByRole('button', { name: 'Batalkan' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');


  await page.locator('tr:nth-child(9) > .text-center > .btn-group > .command-edit').click();
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill('Updated-Testing');
  await page.getByRole('spinbutton', { name: 'Level *' }).click();
  await page.getByRole('spinbutton', { name: 'Level *' }).fill('7');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');

  await expect(page.locator('#level-error')).toContainText('Please insert level');

  await page.getByRole('button', { name: 'Batalkan' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');


  await page.locator('tr:nth-child(9) > .text-center > .btn-group > .command-delete').click();
  await page.getByRole('button', { name: 'Tidak' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');
  await page.locator('tr:nth-child(10) > .text-center > .btn-group > .command-delete').click();
  await page.getByRole('button', { name: 'Ya' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');
  
});