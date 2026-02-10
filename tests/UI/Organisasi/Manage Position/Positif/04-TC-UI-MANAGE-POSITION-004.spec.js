// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Create data Manage Position', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-MANAGE-POSITION-004');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Organisasi -> Manage Position
      3. klik buat baru
          Nama  : Playwright-Testing
          Level : 5
      4. Save
      5. Oke
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  const keyword1 = 'Playwright-Testing 3';
  const keyword2 = '5';

  await page.getByRole('link', { name: 'Organisasi' }).click();
  await page.getByRole('link', { name: 'Manage Position' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Buat baru' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Nama *' }).fill(keyword1);
  await page.getByRole('spinbutton', { name: 'Level *' }).fill(keyword2);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByLabel('Position Name: activate to')).toContainText('Position Name');

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
