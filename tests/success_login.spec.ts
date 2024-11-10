import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test('success_login', async () => {
  const browser = await chromium.launch({ headless: false });  // Запуск браузера с интерфейсом.
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://dev.topklik.online/', { timeout: 10000 });
  await page.fill('input[name=login]', 'tester@inzhenerka.tech');
  await page.fill('input[name=pass]', 'LetsTest!');
  await page.click('button[type=button]');
  const userNameLocator = page.locator('h2:has-text("Tester")');
  await expect(userNameLocator).toHaveText('Tester');
});