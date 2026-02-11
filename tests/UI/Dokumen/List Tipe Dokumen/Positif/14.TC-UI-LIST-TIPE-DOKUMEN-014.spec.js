
// Standarisasi Boilerplate Code
import { test, expect } from '@playwright/test';
import { ReportingApi } from '@reportportal/agent-js-playwright';

//baris ini berfungsi untuk menggunakan data testing
const devTestData = JSON.parse(JSON.stringify(require('../../../../../data/dev/dataDev.json')));
const dataDev = devTestData.MENU_LOGIN.LOGINKREDENSIALINVALID;
const qaTestData = JSON.parse(JSON.stringify(require('../../../../../data/qa/dataQa.json')));
const dataQa = qaTestData.MENU_DOKUMEN.LIST_TIPE_DOKUMEN;


test('Hapus Data Tipe Dokumen', async ({ page, browserName }, testInfo) => {
  //baris ini berfungsi untuk menginputkan data scenario id yang ada di test case
  ReportingApi.setTestCaseId('TC-UI-LIST-TIPE-DOKUMEN-013');
  //baris ini berfungsi untuk menginputkan data test step yang ada di test case
  ReportingApi.setDescription(`
      Test Step :
      1. Login Admin
      2. Masuk ke Menu Dokumen -> List Kelola tipe dokumen
      3. Klik button "Tambah Sub" pada salah satu data induk
          Nama : Testing Sub Tipe
          Deskripsi : Testing Sub Tipe
      4. Simpan
  `);
  ReportingApi.addAttributes([{ key: 'browser', value: browserName }]);
  let testData = dataDev;
  if (process.env.ENV === 'qa') {
      testData = dataQa;
      
  }

  await page.goto(process.env.WEB_URL);
  await page.getByRole('link', { name: 'Dokumen' }).click();
  await page.getByRole('link', { name: 'Kelola Tipe Dokumen' }).click();
  await page.getByTitle('Tambah Sub').nth(3).click();
  await page.getByRole('textbox', { name: 'Jenis Induk' }).fill(dataQa.inputdata7);
  await page.getByRole('textbox', { name: 'Deskripsi' }).fill(dataQa.inputdata7);
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('alert')).toContainText('Berhasil menyimpan jenis dokumen');

    
  const screenshot = await page.screenshot();
  await testInfo.attach("Screenshot", {
    body: screenshot,
    contentType: "image/png",
  });
});
