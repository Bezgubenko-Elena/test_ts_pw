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
  
  
  await page.click('button[data-testid=countertop-type-u]');

  await page.click('div[data-testid=select-thickness] button');
  await page.click('div[data-testid=select-thickness] div button'); // тут может нужен if чтобы проверять, что уже выбрано, или до первоначального состояния чистить через фикстуры

  await page.click('button[data-testid=top-button]:nth-child(3)');

  await page.click('div[data-testid=product-item] div div h4:has-text("Остров")');

  await page.click('div[data-testid=options-item] div div h4:has-text("Проточки для стока воды")');

  await page.click('div[data-testid=stone-block] div:has-text("N-103 Gray Onix")');

  await page.click('button[data-testid="calc-button"]');


  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // Ожидаем, пока откроется новая вкладка
    page.click('button[data-testid="open-report-button"]') // Выполняем клик на кнопку
  ]);
  
  // Теперь у вас есть доступ к новой вкладке
  await newPage.waitForLoadState(); // Убедимся, что новая страница загрузилась






 // await page.click('button[data-testid="open-report-button"]');

  const elementLocatorMaterial = newPage.locator('h4:has-text("Общие параметры") + table.table tbody tr:nth-child(2) td:nth-child(3)');
  await expect(elementLocatorMaterial).toHaveText('acryl:Neomarm:N-103 Gray Onix');


  const elementLocatorTypeTop = newPage.locator('h4:has-text("Параметры столешницы 1") + table.table tbody tr:nth-child(2) td:nth-child(3)');
  await expect(elementLocatorTypeTop).toHaveText('П-образная');

  const elementLocatorOptions = newPage.locator('h4:has-text("Параметры столешницы 1") + table.table tbody tr:nth-child(6) td:nth-child(3)');
  await expect(elementLocatorOptions).toHaveText('Проточки для стока воды');

  const elementLocatorValue = newPage.locator('h3:has-text("Итоговая стоимость заказа") + table.table tbody tr:nth-child(6) td:nth-child(5)');
  await expect(elementLocatorValue).toHaveText('415700.00 ₽');


  await newPage.waitForTimeout(5000);
});
