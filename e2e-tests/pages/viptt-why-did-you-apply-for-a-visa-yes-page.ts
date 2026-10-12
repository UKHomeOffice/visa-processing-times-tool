import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class vipttWhyDidYouApplyForAVisaYesPage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return 'Why did you apply for a visa?';
    }

    async answerInUkWhenAppliedForVisaYes() {
        await this.click(this.yesButton);
        await this.clickSaveAndContinueButton();
    }

    async answerInUkWhenAppliedForVisaNo() {
        await this.click(this.noButton);
        await this.clickSaveAndContinueButton();
    }
}
