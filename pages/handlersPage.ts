import { Page, Locator } from 'playwright';
import { BasePage } from '../pages/basePage.js';


export class HandlersPage extends BasePage {
    private buttonForOpenReport: Locator;

    constructor(page: Page) {
        super(page);
        this.buttonForOpenReport = page.locator('button[data-testid="open-report-button"]');  
    }

    async clickButtonForOpenReport() {
        await this.buttonForOpenReport.click();
    }
    
}