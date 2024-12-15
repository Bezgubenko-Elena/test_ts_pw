import { test } from '@playwright/test';
import { MainPage } from '../pages/mainPage.js';


test.describe('Проверка переключателя Скрыть столешницу', () => {
  test.use({
    storageState:
      './playwright/.auth/user.json',
  });

  test('check_hide_toptable', async ( {page} ) => {

    const mainPage = new MainPage(page);
  
    await mainPage.goto();
    await mainPage.waitForUrl(mainPage.baseUrl);
    await mainPage.isTitleVisiable('Калькулятор столешниц');
  
    await mainPage.switchToggleHideTableTop();
  
    await mainPage.checkButtonShowTableTop('Показать столешницу');
  });
});
