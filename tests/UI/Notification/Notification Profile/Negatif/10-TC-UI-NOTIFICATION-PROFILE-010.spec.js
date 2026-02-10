// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Create data Notification Profile', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-NOTIFICATION-PROFILE-010');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Notification -> List Notification Profile
      3. Klik button "buat baru"
            Profile Type : Whatsapp
            Name : 
            Sender : test@gmail.com

            Configuration
              Name : Pw-Testing
            Host : Pw-Testing
            Port : Pw-Testing
            Connection Class : Pw-Testing
            SSL : Pw-Testing
            Username : Pw-Testing
            Password : Pw-Testing
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Notification' }).click();
  await page.getByRole('link', { name: 'Notification Profile' }).click();
  const keyword1 = 'Playwrighttest';
  const keyword2 = 'pwtest';
  const email = 'playwrighttest@gmail.com';

  await page.getByRole('button', { name: 'New Profile' }).click();
  await page.waitForTimeout(1000)
  await page.locator('#notif_profile_type_id').selectOption('5');
  await page.locator('#profile_name').fill('');
  await page.locator('#email').fill(email);
  await page.getByRole('button', { name: 'Create Configuration' }).click();
  await page.waitForTimeout(1000)
  await page.locator('#name').fill(keyword2);
  await page.locator('#host').fill(keyword2);
  await page.locator('#port').fill(keyword2);
  await page.locator('#connection_class').fill(keyword2);
  await page.locator('#ssl').fill(keyword2);
  await page.locator('#username').fill(keyword2);
  await page.locator('#password').fill(keyword2);
  await page.locator('#configModal').getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('#profile_name-error')).toContainText('Kolom ini diperlukan.');
  

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
