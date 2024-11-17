import { Page } from 'playwright';


export abstract class BasePage {
    protected page: Page;
    protected baseUrl: string;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = 'https://dev.topklik.online/';
    }

    async goto() {
        await this.page.goto(this.baseUrl);
    }
}