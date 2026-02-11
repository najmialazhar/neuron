
// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_DOKUMEN.LIST_DOKUMEN;


test('Create Data Dokumen', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-LIST-DOKUMEN-005');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Dokumen -> List Kelola dokumen
      3. Klik button "+ buat baru"
          (Kolom wajib)
          No Dokumen : NW/2019/12/16/SK.6661
          Nama :
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Dokumen ' }).click();
  await page.getByRole('link', { name: 'Kelola Dokumen' }).click();
  await page.getByRole('button', { name: 'Buat baru' }).click();  
  await page.getByRole('textbox', { name: 'No Dokumen' }).fill(dataQa.inputdata2);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('heading')).toContainText('Kelola Dokumen');

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
