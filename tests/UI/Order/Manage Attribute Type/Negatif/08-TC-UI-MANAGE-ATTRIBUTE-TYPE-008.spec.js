// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_ORDER.MANAGE_ATTRIBUTE_TYPE;


test('Update Data Manage Attribute Type', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-MANAGE-ATTRIBUTE-TYPE-008');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> List Manage Attribute Type
      3. Klik button "ubah" pada salah satu data
        Nama : 
      4. Simpan
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
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(5).click();
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill('');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.locator('#name-error')).toContainText('This field is required.');

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
