// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Delete Data Define Subtype', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-DEFINE-SUBTYPE-010');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> Define Subtype
      3. Klik button "hapus" pada salah satu data
      4. Ya
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  const keyword1 = 'Updated Define Subtype 010'
  const keyword2 = ''
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'Define Subtype' }).click();
  await page.waitForTimeout(1000);
  await page.locator('tr:nth-child(4) > td:nth-child(5) > .btn-group > .btn.btn-sm.btn-primary').click();  
  await page.waitForTimeout(1000);
  await page.getByLabel('Nama Tipe Order *').selectOption('- Pilih -');
  await page.getByRole('textbox', { name: 'Nama *' }).fill(keyword1);
  await page.getByRole('textbox', { name: 'Deskripsi' }).fill(keyword2);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('alert')).toContainText('×order_save_failed');


  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
