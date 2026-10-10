import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class vipttOutcomeOutsidePage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return 'You can expect a reply by';
    }
}
