import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class vipttFamilyVisasAndApplicationsToSettleInTheUKPage extends basePage {

    constructor(page: Page) {
        super(page);
    }

    async expectedPageTitle(): Promise<string> {
        return 'Family visas and applications to settle in the UK';
    }
}
