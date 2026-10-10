import { Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class vipttWhyDidYouApplyForAVisaNoPage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return 'Why did you apply for a visa?';
    }

    async answerVisaPurpose(purpose: string) {
        let label: string;
        switch (purpose) {
            case 'For work':
                label = c.FOR_WORK_LABEL;
                break;
            case 'To study':
                label = c.TO_STUDY_LABEL;
                break;
            case 'To get married':
                label = c.TO_GET_MARRIED_LABEL;
                break;
            case 'To travel':
                label = c.TO_TRAVEL_LABEL;
                break;
            case 'Bno':
                label = c.BNO_LABEL;
                break;
            default:
                label = c.SOMETHING_ELSE_LABEL;
        }
        await this.selectRadioOrCheckBox(label);
        await this.clickContinueButton();
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
