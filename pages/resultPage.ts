import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from '../pages/basePage.js';


export class ResultPage extends BasePage {
    private typeMaterial: Locator;
    private typeTableTop: Locator;
    private isAddWaterHoles: Locator;
    private totalOrderCost: Locator;
    public commonPartURL: string;

    constructor(page: Page) {
        super(page);
        this.typeMaterial = page.locator('td:has-text("Материал") + td');
        //this.typeMaterial = page.locator('h4:has-text("Общие параметры") + table.table tbody tr:nth-child(2) td:nth-child(3)');
        this.typeTableTop = page.locator('td:has-text("Тип столешницы") + td');
        //this.typeTableTop = page.locator('h4:has-text("Параметры столешницы 1") + table.table tbody tr:nth-child(2) td:nth-child(3)');
        this.isAddWaterHoles = page.locator('td:has-text("Опции") + td');
        //this.isAddWaterHoles = page.locator('h4:has-text("Параметры столешницы 1") + table.table tbody tr:nth-child(6) td:nth-child(3)');
        this.totalOrderCost = page.locator('h3:has-text("Итоговая стоимость заказа") + .table tr:has(td.fw-bold) td[class="col-2 fw-bold"]');
        //this.totalOrderCost = page.locator('h3:has-text("Итоговая стоимость заказа") + table.table tbody tr:nth-child(6) td:nth-child(5)');
        this.commonPartURL = 'https://report.topklik.online/calculation';
    }

    async checkTypeMaterial(expectedText: string) {
        await expect(this.typeMaterial).toHaveText(expectedText);
    }

    async checkTypeTableTop(expectedText: string) {
        await expect(this.typeTableTop).toHaveText(expectedText);
    }

    async checkIsAddWaterHoles(expectedText: string) {
        await expect(this.isAddWaterHoles).toHaveText(expectedText);
    }

    async checkTotalOrderCost(expectedTextLocator: Locator) {
        const expectedText = await expectedTextLocator.textContent();
        if (expectedText !== null) {
            const formattedExpectedText = expectedText.replace(/\s+/g, '').replace('₽', '').concat('.00 ₽');
            await expect(this.totalOrderCost).toHaveText(formattedExpectedText);
          } else {
            throw new Error(`Элемент не содержит текст: ожидалось '${expectedText}'`);
          }
        }
}