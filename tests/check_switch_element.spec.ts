import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage.js';


test.describe('Проверка переключения на П-образную столешницу', () => {
  test.use({
    storageState:
      './playwright/.auth/user.json',
  });
  test('check_switch_toptable', async ( {page} ) => {

    const mainPage = new MainPage(page);
  
    await mainPage.goto();
    await mainPage.waitForUrl(mainPage.baseUrl);
    await mainPage.isTitleVisiable('Калькулятор столешниц');
  
    await mainPage.switchTableTopStraight();
    await mainPage.switchTableTopUShaped();
  
    await mainPage.checkFieldTypeTopTable('П-образная столешница');
  });
});