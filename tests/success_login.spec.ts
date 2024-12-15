import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MainPage } from 'pages/mainPage.js';
// const { chromium } = require('playwright');

test('success_login', async ( {page} ) => {
//  const browser = await chromium.launch({ headless: false });  // Запуск браузера с интерфейсом.
//  const context = await browser.newContext();
//  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  await mainPage.ClickButtomOutput();

  await loginPage.goto();
  await loginPage.fillLogin('tester@inzhenerka.tech');
  await loginPage.fillPassword('LetsTest!');
  await loginPage.clickSubmit();

  await loginPage.waitForUrl(loginPage.baseUrl);
  await loginPage.isTitleVisiable('Калькулятор столешниц');
  await loginPage.checkUserName('Tester');
});