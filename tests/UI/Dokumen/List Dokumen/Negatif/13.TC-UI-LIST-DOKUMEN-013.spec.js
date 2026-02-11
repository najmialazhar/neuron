
// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_DOKUMEN.LIST_DOKUMEN;


test('Batal Update Data Dokumen', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-LIST-DOKUMEN-013');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Dokumen -> List Kelola dokumen
      3. Klik button "ubah" pada salah satu data
      4. Batalkan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  const noDokumen = 'NW/2019/12/16/KK.80080201'; // sesuaikan sama nomor dokumen yang mau di update
  const UpdatedNoDokumen = 'NW/2019/12/16/SK.81080203'; // sesuaikan dengan nomor dokumen yang baru
  const keyword2 = 'Update Testing'; // sesuaikan sama nama yang mau diinput sebagai testing update
  await page.getByRole('link', { name: /dokumen/i }).click();
  await page.getByRole('link', { name: /kelola dokumen/i }).click();
  const row = page.getByRole('row', { name: new RegExp(dataQa.inputdata1) });
  await row.getByLabel(/ubah/i).click();
  await page.getByRole('button', { name: 'Batalkan' }).click();
  await expect(page.locator('h3')).toContainText('Kelola Dokumen');
    
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
