import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage.js';


test('check_switch_toptable', async ( {page} ) => {

  const mainPage = new MainPage(page);

  await mainPage.goto();
  await mainPage.switchTableTopStraight();
  await mainPage.switchTableTopUShaped();

  await mainPage.checkFieldTypeTopTable('П-образная столешница');
});
