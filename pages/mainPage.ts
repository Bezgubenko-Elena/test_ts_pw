import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { BasePage } from '../pages/basePage.js';


export class MainPage extends BasePage {
    private buttonSwitchStraightTableTop: Locator;
    private buttonSwitchUShapedTableTop: Locator;
    private fieldTypeTableTop: Locator;
    private toggleHideTableTop: Locator;
    private buttonShowTableTop: Locator;
    private selectorDebthTableTop: Locator;
    private dropdownListFieldDebthTableTop: Locator;
    private buttonWallPanel: Locator;
    private buttonAddKitchenIsland: Locator;
    private buttonAddWaterHoles: Locator;
    private buttonChoiceMaterial: Locator;
    private buttonGetResult: Locator;
    private buttonOutput: Locator;
    public checkFieldTypeMaterial: string;
    public checkFieldTypeTableTop: string;
    public checkFieldIsAddWaterHoles: string;

    constructor(page: Page) {
        super(page);
        this.buttonSwitchStraightTableTop = page.locator('button[data-testid=countertop-type-q]');
        this.buttonSwitchUShapedTableTop = page.locator('button[data-testid=countertop-type-u]');
        this.fieldTypeTableTop = page.locator('div[data-testid=order-list] h4:nth-of-type(1)');
        this.toggleHideTableTop = page.locator('div[data-testid=hide-countertop]');
        this.buttonShowTableTop = page.locator('div[data-testid=show-main]');
        this.selectorDebthTableTop = page.locator('div[data-testid=select-thickness] label:has-text("Толщина") + button');
        this.dropdownListFieldDebthTableTop = page.locator('div[data-testid=select-thickness] div button');
        this.buttonWallPanel = page.locator('button[data-testid=top-button]:nth-child(3)');
        this.buttonAddKitchenIsland = page.locator('[data-testid="product-item"]').filter({ hasText: 'Остров' });
        this.buttonAddWaterHoles = page.locator('[data-testid="options-item"]').filter({ hasText: 'Проточки для стока воды' });
        this.buttonChoiceMaterial = page.locator('[data-testid="stone-block"]').filter({ hasText: 'N-103 Gray Onix' });
        this.buttonGetResult = page.locator('button[data-testid="calc-button"]');
        this.buttonOutput = page.locator('button').filter({hasText: 'Выйти'});
        this.checkFieldTypeMaterial = '';
        this.checkFieldTypeTableTop = '';
        this.checkFieldIsAddWaterHoles = '';
    }

    async switchTableTopStraight() {
        await this.buttonSwitchStraightTableTop.click();
    }

    async switchTableTopUShaped() {
        await this.buttonSwitchUShapedTableTop.click();
    }

    async switchToggleHideTableTop() {
        await this.toggleHideTableTop.click();
    }

    async openSelectorDebthTableTop() {
        await this.selectorDebthTableTop.click();
    }

    async choiceDropdownListFieldDebthTableTop() {
        await this.dropdownListFieldDebthTableTop.click();
    }

    async clickButtonWallPanel() {
        await this.buttonWallPanel.click();
    }

    async clickButtonAddKitchenIsland() {
        await this.buttonAddKitchenIsland.click();
    }

    async clickButtonAddWaterHoles() {
        await this.buttonAddWaterHoles.click();
    }

    async clickButtonChoiceMaterial() {
        await this.buttonChoiceMaterial.click();
    }

    async clickButtonGetResult() {
        const requestPromise = this.page.waitForRequest(
            request => request.url().endsWith("/calculate_prices") && request.method() === "POST"
        );
        await this.buttonGetResult.click();
        const request = await requestPromise;
        const jsonData = request.postDataJSON();

        this.checkFieldTypeMaterial = jsonData.parameters.material.uid;
        
        type CaseType = 'Q' | 'L' | 'U';
        function checkTypeTableTop (type: CaseType): string {
            switch (type) {
                case 'Q':
                    return 'Прямая';
                case 'L':
                    return 'Г-образная';
                case 'U':
                    return 'П-образная';
            }
        }
        this.checkFieldTypeTableTop = checkTypeTableTop(jsonData.parameters.countertops[0].type);

        const checkIsAddWaterHoles = (drainGroves: boolean) => drainGroves ? 'Проточки для стока воды' : '';
        this.checkFieldIsAddWaterHoles = checkIsAddWaterHoles(jsonData.parameters.options.drainGroves);
    }

    async ClickButtomOutput() {
        this.buttonOutput.click();
    }


    async checkFieldTypeTopTable(TypeTopTable: string) {
        await expect(this.fieldTypeTableTop).toHaveText(TypeTopTable);
    }

    async checkButtonShowTableTop(buttonText: string) {
        await expect(this.buttonShowTableTop).toHaveText(buttonText);
    }
    
}