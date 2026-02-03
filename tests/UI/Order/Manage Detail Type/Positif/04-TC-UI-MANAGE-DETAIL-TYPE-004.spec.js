// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Create Data Manage Detail Type', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-MANAGE-DETAIL-TYPE-004');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> List Manage Attribute Type
      3. Klik button "buat baru"
          Nama : Attribute Type Name 003
          Deskripsi : For Playwright Testing
      4. Simpan
      5. Refresh Page
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  const keyword1 = 'Detail Type Name 3'; // sesuaikan sama nama atribut-tipe yg mau diinput
  const keyword2 = 'For Playwright Testing 3'; // sesuaikan sama deskripsi yg mau diinput

  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'Manage Detail Type' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Buat Baru' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill(keyword1);
  await page.getByRole('textbox', { name: 'Deskripsi' }).click();
  await page.getByRole('textbox', { name: 'Deskripsi' }).fill(keyword2);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.locator('tbody')).toContainText(keyword1);

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
