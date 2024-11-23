import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/loginPage.js';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillLogin('tester@inzhenerka.tech');
  await loginPage.fillPassword('LetsTest!');
  await loginPage.clickSubmit();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://dev.topklik.online/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'Выйти' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});