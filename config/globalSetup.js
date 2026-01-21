const { chromium, expect } = require('@playwright/test');
const dotenv = require('dotenv');

module.exports = async config => {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(process.env.WEB_URL);

  // Sesuaikan selector inputan username sesuai project yang di handle
  await page.getByRole('textbox', { name: 'User code or email' }).fill('pandupp21');

  // Sesuaikan selector inputan password sesuai project yang di handle
  await page.getByRole('textbox', { name: 'Password' }).fill('@Aporla15');

  // Sesuaikan selector button login sesuai project yang di handle
  await page.getByRole('button', { name: 'Login' }).click();

  // Sesuaikan selector ekspektasi ketika berhasil login
  await expect(page.getByRole('img', { name: 'Telkom Indonesia' }).nth(1)).toBeVisible();

  await page.context().storageState({ path: storageState });
  await browser.close();
};

async function globalSetup() {
    try {
        if (process.env.ENV) {
            dotenv.config({
                path: `.env.${process.env.ENV}`,
                override: true
            });
        }
    } catch (error) {
        console.error("Error in loading environment variables", error);
    }
}
export default globalSetup;