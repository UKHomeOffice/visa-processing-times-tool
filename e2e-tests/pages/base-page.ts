import { Page, Locator, expect } from '@playwright/test';

export class basePage {
    readonly page: Page;

    // Common locators
    readonly headerText: Locator;
    readonly continueButton: Locator;
    readonly saveAndContinueButton: Locator;
    readonly yesButton: Locator;
    readonly noButton: Locator;
    readonly dateDay: Locator;
    readonly dateMonth: Locator;
    readonly dateYear: Locator;
    readonly thereIsAProblemText: Locator;
    readonly errorSummaryList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerText = page.locator('h1');
        this.continueButton = page.locator("[value='Continue'].govuk-button");
        this.saveAndContinueButton = page.locator('#gov-grid-row-content div > form > input:nth-of-type(1)');
        this.yesButton = page.locator('label').filter({ hasText: /^\s*Yes\s*$/ });
        this.noButton = page.locator('label').filter({ hasText: /^\s*No\s*$/ });
        this.dateDay = page.locator("input[id*='day']");
        this.dateMonth = page.locator("input[id*='month']");
        this.dateYear = page.locator("input[id*='year']");
        this.thereIsAProblemText = page.locator('#error-summary-title');
        this.errorSummaryList = page.locator("[class='govuk-list govuk-error-summary__list']");
    }

    // Assertion page title
    async assertPageTitle(page: Page, title: string) {
        await expect(page).toHaveTitle(title);
    }

    // Assertion page heading (source expectedPageTitle values are page headings)
    async assertPageHeading(expectedHeading: string) {
        await expect(this.headerText.first()).toContainText(expectedHeading);
    }

    // Generic click
    async click(locator: Locator) {
        await locator.click();
    }

    // Generic type
    async type(locator: Locator, text: string) {
        await locator.fill(text);
        await this.page.keyboard.press('Tab');
    }

    async clickContinueButton() {
        await this.click(this.continueButton);
    }

    async clickSaveAndContinueButton() {
        await this.click(this.saveAndContinueButton);
    }

    // Visibility check
    async isVisible(locator: Locator) {
        return await locator.isVisible();
    }

    // Radio or checkbox label containing the given text
    getRadioOrCheckBox(label: string): Locator {
        return this.page.locator('label').filter({ hasText: label }).first();
    }

    async selectRadioOrCheckBox(label: string) {
        await this.click(this.getRadioOrCheckBox(label));
    }

    async answerYes() {
        await this.click(this.yesButton);
        await this.clickContinueButton();
    }

    async answerNo() {
        await this.click(this.noButton);
        await this.clickContinueButton();
    }

    async enterDay(day: string) {
        await this.dateDay.fill(day);
    }

    async enterMonth(month: string) {
        await this.dateMonth.fill(month);
    }

    async enterYear(year: string) {
        await this.dateYear.fill(year);
    }

    async enterDate(day: string, month: string, year: string) {
        await this.enterDay(day);
        await this.enterMonth(month);
        await this.enterYear(year);
    }

    async selectCheckboxOptionWithText(page: Page, optionText: string) {
        if (!optionText || optionText.trim() === '') {
            throw new Error('Checkbox option text value cannot be null or blank.');
        }

        const checkboxOption: Locator = page.getByRole('checkbox', { name: optionText });
        await checkboxOption.check();
    }

    async linkTextIsDisplayed(page: Page, linkText: string): Promise<boolean> {
        return await page.getByRole('link', { name: linkText }).isVisible();
    }

    async getUrlForLinkText(page: Page, linkText: string): Promise<string | null> {
        return await page.getByRole('link', { name: linkText }).getAttribute('href');
    }

    async getThereIsAProblemTextErrorText(): Promise<string | null> {
        return await this.thereIsAProblemText.textContent();
    }

    async getErrorSummaryListText(): Promise<string | null> {
        return await this.errorSummaryList.textContent();
    }
}
