// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_ORDER.DEFINE_TYPE;


test('Update Data Define Type', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-DEFINE-TYPE-007');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> Define Type
      3. Klik button "ubah" pada salah satu data
          Nama : 
          Deskripsi :
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'Define Type' }).click();
  await page.waitForTimeout(1000);
  await page.locator('tr:nth-child(4) > td:nth-child(4) > .btn-group > .btn.btn-sm.btn-primary').click();
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill('');
  await page.getByRole('textbox', { name: 'Deskripsi' }).click();
  await page.getByRole('textbox', { name: 'Deskripsi' }).fill('');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(1000)
  await expect(page.locator('#name-error')).toContainText('This field is required.');

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
