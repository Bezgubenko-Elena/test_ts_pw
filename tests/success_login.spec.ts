import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { MainPage } from 'pages/mainPage.js';


test('success_login', async ( {page} ) => {

  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const credentials = loginPage.getLoginPasswordFromEnv();

  await mainPage.ClickButtomOutput();

  await loginPage.goto();
  await loginPage.fillLogin(credentials.login);
  await loginPage.fillPassword(credentials.password);
  await loginPage.clickSubmit();

  await loginPage.waitForUrl(loginPage.baseUrl);
  await loginPage.isTitleVisiable('Калькулятор столешниц');
  await loginPage.checkUserName('Tester');
});