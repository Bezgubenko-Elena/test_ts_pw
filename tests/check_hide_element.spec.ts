import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test('success_login', async () => {
  const browser = await chromium.launch({ headless: false });  // Запуск браузера с интерфейсом.
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://dev.topklik.online/', { timeout: 100000 });
  await page.fill('input[name=login]', 'tester@inzhenerka.tech');
  await page.fill('input[name=pass]', 'LetsTest!');
  await page.click('button[type=button]');
  await page.click('div[data-testid=hide-countertop]');
  const elementLocator = page.locator('div[data-testid=show-main]');
  await expect(elementLocator).toHaveText('Показать столешницу');
});
