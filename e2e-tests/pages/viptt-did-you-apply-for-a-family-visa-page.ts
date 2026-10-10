import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class vipttDidYouApplyForAFamilyVisaPage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return 'Did you apply for a Family visa?';
    }

    async answerFamilyVisaYes() {
        await this.answerYes();
    }

    async answerFamilyVisaNo() {
        await this.answerNo();
    }

    async answerFamilyVisa(answer: string) {
        if (answer.toLowerCase() === 'yes') {
            await this.answerFamilyVisaYes();
        } else {
            await this.answerFamilyVisaNo();
        }
    }
}
