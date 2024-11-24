import { Page, Locator } from 'playwright';
import { BasePage } from '../pages/basePage.js';


export class HandlersPage extends BasePage {
    private buttonForOpenReport: Locator;
    public fieldFinalPrice: Locator;


    constructor(page: Page) {
        super(page);
        this.buttonForOpenReport = page.locator('button[data-testid="open-report-button"]');
        this.fieldFinalPrice = page.locator('div[data-testid=price-button] h3');
  
    }

    async clickButtonForOpenReport() {
        await this.buttonForOpenReport.click();
    }

}