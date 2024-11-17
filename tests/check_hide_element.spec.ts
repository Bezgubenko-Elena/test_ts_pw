import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage.js';
const { chromium } = require('playwright');


test('check_hide_toptable', async () => {
  const browser = await chromium.launch({ headless: false });  // Запуск браузера с интерфейсом.
  const context = await browser.newContext();
  const page = await context.newPage();

  const mainPage = new MainPage(page);

  await mainPage.goto();
  await page.fill('input[name=login]', 'tester@inzhenerka.tech');
  await page.fill('input[name=pass]', 'LetsTest!');
  await page.click('button[type=button]');

  await mainPage.switchToggleHideTableTop();

  await mainPage.checkButtonShowTableTop('Показать столешницу');
});
