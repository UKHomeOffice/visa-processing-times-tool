import { Page, Locator } from '@playwright/test';
import { basePage } from './base-page';

export class vipttWereYouInTheUKWhenYouAppliedForYourVisaPage extends basePage {

    readonly acceptCookies: Locator;
    readonly hideCookiesMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.acceptCookies = page.locator("//button[contains(text(),'Accept additional cookies')]");
        // Page renders two matching hide buttons (accept/reject banners); source clicked the first
        this.hideCookiesMessage = page.locator("//button[contains(text(),'Hide cookie message')]").first();
    }

    async expectedPageTitle(): Promise<string> {
        return 'Were you in the UK when you applied for your visa?';
    }

    async openViptt() {
        await this.page.goto('/');
    }

    // Cookie banner is only shown on a fresh session
    async acceptCookiesAndHideMessage() {
        if (await this.acceptCookies.isVisible()) {
            await this.click(this.acceptCookies);
        }
        if (await this.hideCookiesMessage.isVisible()) {
            await this.click(this.hideCookiesMessage);
        }
    }

    async answerInUkWhenAppliedForVisaYes() {
        await this.answerYes();
    }

    async answerInUkWhenAppliedForVisaNo() {
        await this.answerNo();
    }

    async answerWereYouInTheUk(answer: string) {
        if (answer.toLowerCase() === 'yes') {
            await this.answerInUkWhenAppliedForVisaYes();
        } else {
            await this.answerInUkWhenAppliedForVisaNo();
        }
    }
}
