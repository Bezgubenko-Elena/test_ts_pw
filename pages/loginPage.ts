import { Page, Locator } from 'playwright';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://dev.topklik.online/');
    }

    async fillLogin(login: string) {
        await this.page.fill('input[name=login]', login);
    }

    async fillPassword(password: string) {
        await this.page.fill('input[name=pass]', password);
    }

    async submit() {
        await this.page.click('button[type=button]');
    }
}