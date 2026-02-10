// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Search data Notification Email', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-NOTIFICATION-EMAIL-002');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Notification -> List Notification Email
      3. Masukkan inputan "testing" pada kolom search
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  const keyword1 = 'qqq'

  await page.getByRole('link', { name: 'Notification' }).click();
  await page.getByRole('link', { name: 'Notification Email' }).click();
  await page.getByRole('searchbox', { name: 'Cari:' }).fill(keyword1);
  await expect(page.getByRole('cell')).toContainText('Tidak ada data yang tersedia pada tabel ini');
  

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
