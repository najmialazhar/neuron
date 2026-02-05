// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;


test('Batal Create Data Define Subtype', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-DEFINE-SUBTYPE-007');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Order -> Define Subtype
      3. Klik button "ubah" pada salah satu data
          Nama : 
          Deskripsi :
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }
  await page.goto(process.env.WEB_URL);
  const keyword1 = ''; // sesuaikan sama nama atribut-tipe yg mau diinput
  const keyword2 = ''; // sesuaikan sama deskripsi yg mau diinput

  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'Define Type' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Buat Baru' }).click();
  await page.getByRole('button', { name: 'Batal' }).click();
  await page.waitForTimeout(1000)
  await expect(page.getByLabel('Nama: activate to sort column')).toContainText('Nama');

  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png", 
  });
});
