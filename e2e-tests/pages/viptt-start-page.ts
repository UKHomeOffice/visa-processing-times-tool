import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class vipttStartPage extends basePage {

    readonly acceptCookies: Locator;
    readonly hideCookiesMessage: Locator;
    readonly startNowButton: Locator;

    constructor(page: Page) {
        super(page);
        this.acceptCookies = page.locator("//button[contains(text(),'Accept additional cookies')]");
        this.hideCookiesMessage = page.locator("//button[contains(text(),'Hide this message')]");
        this.startNowButton = page.locator("//*[@id='gov-grid-row-content']/div/form/input[1]");
    }

    async expectedPageTitle(): Promise<string> {
        return 'How do you want to sign in?';
    }

    async openViptt() {
        await this.page.goto('/');
    }

    async start() {
        await this.click(this.startNowButton);
    }

    async acceptCookiesAndHideMessage() {
        await this.click(this.acceptCookies);
        await this.click(this.hideCookiesMessage);
    }

    async uanSignIn(radioLabel: string) {
        await this.selectRadioOrCheckBox(radioLabel);
        await this.clickContinueButton();
    }
}
