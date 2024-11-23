import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage.js';


test('check_hide_toptable', async ( {page} ) => {

  const mainPage = new MainPage(page);

  await mainPage.goto();
  await mainPage.switchToggleHideTableTop();

  await mainPage.checkButtonShowTableTop('Показать столешницу');
});
