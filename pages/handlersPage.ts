import { Page, Locator } from 'playwright';
import { BasePage } from '../pages/basePage.js';


export class HandlersPage extends BasePage {
    private buttonForOpenReport: Locator;
    public fieldFinalPrice: Locator;


    constructor(page: Page) {
        super(page);
        this.buttonForOpenReport = page.getByTestId('open-report-button');
        //this.buttonForOpenReport = page.locator('button[data-testid="open-report-button"]');
        this.fieldFinalPrice = page.getByTestId('price-button').locator('h3');
        //this.fieldFinalPrice = page.locator('div[data-testid=price-button] h3');
  
    }

    async clickButtonForOpenReport() {
        await this.buttonForOpenReport.waitFor({ state: 'visible'}); //, timeout: 1000 
        await this.buttonForOpenReport.click();
    }

}