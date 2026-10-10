import { Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { BankHolidayService, WorkingDayService } from '../utility-helper/working-day-service';

type DateParts = { day: string; month: string; year: string };
const workingDayService = new WorkingDayService(new BankHolidayService());

export class vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return 'When did you verify your identity by providing your biometrics?';
    }

    private async answerFixedDate(date: DateParts) {
        await this.enterDate(date.day, date.month, date.year);
        await this.clickContinueButton();
    }

    async answerIdentityBiometricsDateInSla() {
        await this.answerFixedDate(c.DATE_IN_SLA);
    }

    async answerIdentityBiometricsDateOutOfSla() {
        await this.answerFixedDate(c.DATE_OUT_OF_SLA);
    }

    async answerIdentityBiometricsDateInSlaP() {
        await this.answerFixedDate(c.DATE_IN_SLA_P);
    }

    async answerIdentityBiometricsDateOutOfSlaP() {
        await this.answerFixedDate(c.DATE_OUT_OF_SLA_P);
    }

    async answerIdentityBiometricsDateInSlaSp() {
        await this.answerFixedDate(c.DATE_IN_SLA_SP);
    }

    async answerIdentityBiometricsDateOutOfSlaSp() {
        await this.answerFixedDate(c.DATE_OUT_OF_SLA_SP);
    }

    async enterBiometricsDate(date: Date) {
        await this.enterDate(String(date.getDate()), String(date.getMonth() + 1), String(date.getFullYear()));
        await this.clickContinueButton();
    }

    async answerBiometricsDateBySla(option: string) {
        const workingDays = c.WORKING_DAYS[option.toLowerCase()];
        if (workingDays === undefined) {
            throw new Error(`Unknown biometrics option: ${option}`);
        }
        const date = await workingDayService.minusWorkingDays(new Date(), workingDays);
        await this.enterBiometricsDate(date);
    }
}
