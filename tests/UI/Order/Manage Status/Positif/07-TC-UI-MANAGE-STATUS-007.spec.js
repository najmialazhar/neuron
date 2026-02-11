// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_ORDER.MANAGE_STATUS;


test('Update Data Manage Status', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-MANAGE-STATUS-007');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> List Manage Status
      3. Klik button "ubah" pada salah satu data
          Nama : Updated Manage Status 001
          Deskripsi : For Playwright Testing Updated
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'Manage Status' }).click();
  await page.waitForTimeout(1000);
  await page.locator('tr:nth-child(3) > td:nth-child(4) > .btn-group > .btn.btn-sm.btn-primary').click();
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill(dataQa.inputdata4);
  await page.getByRole('textbox', { name: 'Deskripsi' }).click();
  await page.getByRole('textbox', { name: 'Deskripsi' }).fill(dataQa.inputdata5);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(1000)
  await expect(page.locator('tbody')).toContainText(dataQa.inputdata4);

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
