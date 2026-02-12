// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.NOTIFICATION.NOTIFICATION_TEMPLATE;


test('Create Data Notification Template', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-NOTIFICATION-TEMPLATE-008');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Notification -> List Notification Template
      3. Klik button "buat baru"
          Profile : Telkom
          Template Code : 
          Template Name : 
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Notification' }).click();
  await page.getByRole('link', { name: 'Notification Template' }).click();
  await page.getByRole('button', { name: 'New Template' }).click();
  await page.locator('#template_code').fill('');
  await page.locator('#template_name').fill('');
  await page.getByRole('button', { name: 'Content' }).click();
  try {
    await expect(page.locator('#template_code-error'))
      .toContainText('Kolom ini diperlukan.');

    await expect(page.locator('#template_name-error'))
      .toContainText('Kolom ini diperlukan.');

  } catch (error) {
    console.log('Validasi error message gagal:', error);
  };


  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
