import { test } from '@playwright/test';
import { MainPage } from '../pages/mainPage.js';
import { HandlersPage } from '../pages/handlersPage.js';
import { ResultPage } from '../pages/resultPage.js';


test.describe('Сборка и расчет заказа', () => {
  test.use({
    storageState:
      './playwright/.auth/user.json',
  });

  test('check_calculation_order', async ( {page, context} ) => {
  
    const mainPage = new MainPage(page);
    const handlersPage = new HandlersPage(page);
  
    await mainPage.goto();
    await mainPage.waitForUrl(mainPage.baseUrl);
    await mainPage.isTitleVisiable('Калькулятор столешниц');
    
    await mainPage.switchTableTopUShaped();
    await mainPage.openSelectorDebthTableTop();
    await mainPage.choiceDropdownListFieldDebthTableTop();
    await mainPage.clickButtonWallPanel();
    await mainPage.clickButtonAddKitchenIsland();
    await mainPage.clickButtonAddWaterHoles();
    await mainPage.clickButtonChoiceMaterial();
    
    await mainPage.clickButtonGetResult();
    await mainPage.waitForUrl(mainPage.baseUrl);
  
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Ожидаем, пока откроется новая вкладка
      handlersPage.clickButtonForOpenReport()
    ]);
    // Доступ к новой вкладке
    await newPage.waitForLoadState(); // Убедимся, что новая страница загрузилась
  
    await handlersPage.clickButtonForOpenReport();
  
    const resultPage = new ResultPage(newPage);

    await resultPage.waitForUrl(resultPage.commonPartURL);
  
    await resultPage.checkTypeMaterial(mainPage.checkFieldTypeMaterial);
    await resultPage.checkTypeTableTop(mainPage.checkFieldTypeTableTop);
    await resultPage.checkIsAddWaterHoles(mainPage.checkFieldIsAddWaterHoles);
    await resultPage.checkTotalOrderCost(handlersPage.fieldFinalPrice);
  })
});
