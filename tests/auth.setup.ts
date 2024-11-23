import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillLogin('tester@inzhenerka.tech');
  await loginPage.fillPassword('LetsTest!');
  await loginPage.clickSubmit();

  await page.waitForURL('https://dev.topklik.online/');

  await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});