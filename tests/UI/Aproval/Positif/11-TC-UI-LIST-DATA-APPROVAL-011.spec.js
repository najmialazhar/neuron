
// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Filter List Data Approval', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-LIST-DATA-APPROVAL-011');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
    Test Step :
      Cari     : TECH09122024
      Email    : TECH09122024@yopmail.com
      Telepon  :
      Status   : COMPLETED ALL SYSTEM
      Regional :
      Witel    :
      STO      : 
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
  await page.getByRole('textbox', { name: 'Cari', exact: true }).fill('TECH09122024');
  await page.getByRole('textbox', { name: 'Cari berdasarkan Email' }).click();
  await page.getByRole('textbox', { name: 'Cari berdasarkan Email' }).fill('TECH09122024@yopmail.com');
  await page.locator('#filter_status_id').selectOption({ label: 'COMPLETED ALL SYSTEM' });
  await page.getByRole('button', { name: 'Saring' }).click();
  const grid = page.locator('#grid-person');

  
  
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
