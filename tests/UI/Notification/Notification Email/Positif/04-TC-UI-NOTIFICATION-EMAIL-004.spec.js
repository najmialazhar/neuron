// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Create data Notification Email', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-NOTIFICATION-EMAIL-004');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Notification -> List Notification Email
      3. Klik button "buat baru"
            Profile : Telkom
            Template Code : PlaywrightTestingTiga
            Template Name : PlaywrightTestingTiga
            Subject : PlaywrightTestingTiga
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
  const keyword1 = 'PlaywrightTestingTiga'
  await page.getByRole('button', { name: 'New Template' }).click();
  await page.locator('#template_code').fill(keyword1);
  await page.locator('#template_code').fill(keyword1);
  await page.locator('#template_name').fill(keyword1);
  await page.locator('#subject').fill(keyword1);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toContainText('OK');
  
  

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
