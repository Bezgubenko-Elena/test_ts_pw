import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from '../pages/basePage.js';


export class LoginPage extends BasePage {
    private loginField: Locator;
    private passwordField: Locator;
    private submit: Locator;
    private userName: Locator;

    constructor(page: Page) {
        super(page);
        this.loginField = page.locator('input[name=login]');
        this.passwordField = page.locator('input[name=pass]');
        this.submit = page.locator('button[type=button]');
        this.userName = page.locator('h2:has-text("Tester")');
    }

    async fillLogin(login: string) {
        await this.loginField.fill(login);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickSubmit() {
        await this.submit.click();
    }

    async checkUserName(checkedName: string) {
        await expect(this.userName).toHaveText(checkedName);
    }
}