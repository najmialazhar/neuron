
// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_APROVAL.APROVAL;


test('Filter List Data Approval', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-LIST-DATA-APPROVAL-006');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Manage Approval -> List data approval
      3. Klik button filter, masukkan:
          Cari    : TECH09122024
          Email   :
          Telepon :
          Status  :
          Regional:
          Witel   :
          STO     :
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Manage Approval ' }).click();
  await page.getByRole('link', { name: 'List Data Approval' }).click();
  await page.locator('#btnFilter').click();
  await page.getByRole('textbox', { name: 'Cari', exact: true }).fill(dataQa.inputdata1);
  await page.getByRole('button', { name: /saring/i }).click();
  const grid = page.locator('#grid-person');
  
  
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png",
  });
});
