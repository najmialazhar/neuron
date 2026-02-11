// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_ORDER.DEFINE_TYPE;


test('Create Data Define Type', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-DEFINE-TYPE-004');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> Define Type
      3. Klik button "buat baru"
          Nama : Define Type Name 002
          Deskripsi : For Playwright Testing 002
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
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Buat Baru' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill(dataQa.inputdata3);
  await page.getByRole('textbox', { name: 'Deskripsi' }).click();
  await page.getByRole('textbox', { name: 'Deskripsi' }).fill(dataQa.inputdata4);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.locator('tbody')).toContainText(dataQa.inputdata3);

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
