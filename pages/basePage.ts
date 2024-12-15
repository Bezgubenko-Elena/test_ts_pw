import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';


export abstract class BasePage {
    protected page: Page;
    public baseUrl: string;
    protected title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = 'https://dev.topklik.online/';
        this.title = page.locator('h1.style_title__cpvDY');
    }

    async goto() {
        await this.page.goto(this.baseUrl);
    }

    async waitForUrl(expectedText: string) {
        await this.page.waitForLoadState('load');
        await expect(this.page.url()).toContain(expectedText);
    }

    async isTitleVisiable(expectedText: string) {
        await expect(this.title).toBeVisible();
        await expect(this.title).toHaveText(expectedText);
    }
}