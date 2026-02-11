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
  ReportingApi.setTestCaseId('TC-UI-MANAGE-POSITION-010');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
        1. Login Admin
        2. Masuk ke Menu Order -> List Manage Position
        3. Klik button "ubah" pada salah satu data
            Nama : Update-Testing
            Level : 
        4. Simpan
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
  await page.locator('tr:nth-child(9) > .text-center > .btn-group > .command-edit').click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill(dataQa.inputdata5);
  await page.getByRole('spinbutton', { name: 'Level *' }).fill('');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.locator('#level-error')).toContainText('Please insert level');


  
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
