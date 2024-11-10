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
  
  await page.click('button[data-testid=countertop-type-q]');
  await page.click('button[data-testid=countertop-type-u]');
  const elementLocator = page.locator('div[data-testid=order-list] h4:nth-of-type(1)');
  await expect(elementLocator).toHaveText('П-образная столешница');
  await page.waitForTimeout(2000);
});
