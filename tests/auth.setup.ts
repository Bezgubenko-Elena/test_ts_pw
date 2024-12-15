import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';


const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const credentials = loginPage.getLoginPasswordFromEnv();

  await loginPage.goto();
  await loginPage.fillLogin(credentials.login);
  await loginPage.fillPassword(credentials.password);
  await loginPage.clickSubmit();

  await page.waitForURL(loginPage.baseUrl);

  await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible( {timeout: 45000} );

  await page.context().storageState({ path: authFile });
});