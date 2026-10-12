import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class vipttDidYouApplyForAHealthAndWorkVisaPage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return 'Did you apply for a Health and Care work visa?';
    }

    async answerHealthAndCareWorkVisaYes() {
        await this.answerYes();
    }

    async answerHealthAndCareWorkVisaNo() {
        await this.answerNo();
    }

    async answerHealthAndCareWorkVisa(answer: string) {
        if (answer.toLowerCase() === 'yes') {
            await this.answerHealthAndCareWorkVisaYes();
        } else {
            await this.answerHealthAndCareWorkVisaNo();
        }
    }
}
