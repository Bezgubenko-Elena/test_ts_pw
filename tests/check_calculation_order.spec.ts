import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage.js';
import { HandlersPage } from '../pages/handlersPage.js';
import { ResultPage } from '../pages/resultPage.js';
const { chromium } = require('playwright');


test('check_calculation_order', async () => {
  const browser = await chromium.launch({ headless: false });  // Запуск браузера с интерфейсом.
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const mainPage = new MainPage(page);
  const handlersPage = new HandlersPage(page);

  await mainPage.goto();
  await page.fill('input[name=login]', 'tester@inzhenerka.tech');
  await page.fill('input[name=pass]', 'LetsTest!');
  await page.click('button[type=button]');
  
  await mainPage.switchTableTopUShaped();
  await mainPage.openSelectorDebthTableTop(); //не удачно сделано, если будет выбрано перед началом теста, то упадет с неверным значением
  await mainPage.choiceDropdownListFieldDebthTableTop();
  await mainPage.clickButtonWallPanel();
  await mainPage.clickButtonAddKitchenIsland();
  await mainPage.clickButtonAddWaterHoles();
  await mainPage.clickButtonChoiceMaterial();

  await mainPage.clickButtonGetResult();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // Ожидаем, пока откроется новая вкладка
    handlersPage.clickButtonForOpenReport()
  ]);
  // Теперь у вас есть доступ к новой вкладке
await newPage.waitForLoadState(); // Убедимся, что новая страница загрузилась

  const resultPage = new ResultPage(newPage);

  await resultPage.checkTypeMaterial('acryl:Neomarm:N-103 Gray Onix');
  await resultPage.checkTypeTableTop('П-образная');
  await resultPage.checkIsAddWaterHoles('Проточки для стока воды');
  await resultPage.checkTotalOrderCost('423600.00 ₽');
});
