import { Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class vipttDidYouPayForAPriorityServicePage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return "Did you pay for a 'priority' service?";
    }

    async answerPriorityServiceYes(label: string) {
        await this.selectRadioOrCheckBox(label);
        await this.clickContinueButton();
    }

    async answerPriorityServiceNo(label: string) {
        await this.selectRadioOrCheckBox(label);
        await this.clickContinueButton();
    }

    async answerSuperPriorityServiceYes(label: string) {
        await this.selectRadioOrCheckBox(label);
        await this.clickContinueButton();
    }

    async answerPriorityService(service: string) {
        switch (service) {
            case 'No':
                await this.answerPriorityServiceNo(c.PRIORITY_NO_LABEL);
                break;
            case 'Priority':
                await this.answerPriorityServiceYes(c.PRIORITY_LABEL);
                break;
            case 'Super priority':
                await this.answerSuperPriorityServiceYes(c.SUPER_PRIORITY_LABEL);
                break;
            default:
                await this.clickContinueButton();
        }
    }
}
