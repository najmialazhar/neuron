// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_ORDER.MANAGE_ATTRIBUTE_TYPE;


test('Batal Delete Data Manage Attribute Type', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-MANAGE-ATTRIBUTE-TYPE-011');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> List Manage Attribute Type
      3. Klik button "hapus" pada salah satu data
      4. Tidak
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);

  await page.getByRole('link', { name: 'Order ' }).click();
  await page.getByRole('link', { name: 'Manage Attribute Type' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('button', { name: 'Tidak' }).click();
  await expect(page.getByLabel('Nama: activate to sort column')).toContainText('Nama');


  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
