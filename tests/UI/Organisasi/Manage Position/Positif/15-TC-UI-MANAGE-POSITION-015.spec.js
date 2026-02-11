// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.ORGANISASI.MANAGE_POSITION;


test('Update data Manage Position', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-MANAGE-POSITION-015');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
        1. Login Admin
        2. Masuk ke Menu Order -> List Manage Position
        3. Klik button "hapus" pada salah satu data
        4. Tidak
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Organisasi' }).click();
  await page.getByRole('link', { name: 'Manage Position' }).click();
  await page.waitForTimeout(500);
  await page.locator('tr:nth-child(9) > .text-center > .btn-group > .command-delete').click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Tidak' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');
  
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
