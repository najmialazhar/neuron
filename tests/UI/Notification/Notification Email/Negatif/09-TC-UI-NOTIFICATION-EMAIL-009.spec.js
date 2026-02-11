// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.NOTIFICATION.NOTIFICATION_EMAIL;


test('Create data Notification Email', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-NOTIFICATION-EMAIL-009');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Notification -> List Notification Email
      3. Klik button "buat baru"
          Profile : Telkom
          Template Code : PlaywrightTesting
          Template Name : 
          Subject : PlaywrightTesting
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Notification' }).click();
  await page.getByRole('link', { name: 'Notification Email' }).click();
  await page.getByRole('button', { name: 'New Template' }).click();
  await page.locator('#template_code').fill(dataQa.inputdata1);
  await page.locator('#subject').fill(dataQa.inputdata1);
  await page.getByRole('button', { name: 'Save' }).click();
  try {
    await expect(page.locator('#template_name-error'))
      .toContainText('Kolom ini diperlukan.');
  } catch {
    try {
      await expect(page.locator('#subject-error'))
        .toContainText('Kolom ini diperlukan.');
    } catch {
      await expect(page.locator('#template_code-error'))
        .toContainText('Kolom ini diperlukan.');
    }
  }

  

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
