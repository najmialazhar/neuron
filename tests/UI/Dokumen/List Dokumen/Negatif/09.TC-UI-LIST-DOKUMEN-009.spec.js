
// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_DOKUMEN.LIST_DOKUMEN;


test('Update Data Dokumen', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-LIST-DOKUMEN-009');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Dokumen -> List Kelola dokumen
      3. Klik button "ubah" pada salah satu data
          (Kolom wajib)
          No Dokumen : NW/2019/12/16/SK.81080203
          Nama : Update Testing
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: /dokumen/i }).click();
  await page.getByRole('link', { name: /kelola dokumen/i }).click();
  const row = page.getByRole('row', { name: new RegExp(dataQa.inutdata1) });
  await row.getByLabel(/ubah/i).click();
  await page.getByRole('textbox', { name: 'No Dokumen' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'No Dokumen' }).fill(dataQa.inputdata5);
  await page.getByRole('textbox', { name: 'Nama Dokumen' }).click();
  await page.getByRole('textbox', { name: 'Nama Dokumen' }).press('ControlOrMeta+a');
  await page.getByRole('textbox', { name: 'Nama Dokumen' }).fill(dataQa.inputdata6);
  await page.getByRole('button', { name: 'Simpan' }).click();
    
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
