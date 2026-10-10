import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { vipttStartPage } from '../pages/viptt-start-page';
import { vipttWereYouInTheUKWhenYouAppliedForYourVisaPage } from '../pages/viptt-were-you-in-the-uk-when-you-applied-for-your-visa-page';
import { vipttDidYouPayForAPriorityServicePage } from '../pages/viptt-did-you-pay-for-a-priority-service-page';
import { vipttDidYouApplyForAFamilyVisaPage } from '../pages/viptt-did-you-apply-for-a-family-visa-page';
import { vipttWhyDidYouApplyForAVisaYesPage } from '../pages/viptt-why-did-you-apply-for-a-visa-yes-page';
import { vipttWhyDidYouApplyForAVisaNoPage } from '../pages/viptt-why-did-you-apply-for-a-visa-no-page';
import { vipttFamilyVisasAndApplicationsToSettleInTheUKPage } from '../pages/viptt-family-visas-and-applications-to-settle-in-the-uk-page';
import { vipttDidYouApplyForAHealthAndWorkVisaPage } from '../pages/viptt-did-you-apply-for-a-health-and-work-visa-page';
import { vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage } from '../pages/viptt-when-did-you-verify-your-identity-by-providing-your-biometrics-page';
import { vipttOutcomeInsidePage } from '../pages/viptt-outcome-inside-page';
import { vipttOutcomeOutsidePage } from '../pages/viptt-outcome-outside-page';
import { vipttOutcomePriorityInsidePage } from '../pages/viptt-outcome-priority-inside-page';
import { vipttOutcomePriorityOutsidePage } from '../pages/viptt-outcome-priority-outside-page';
import { vipttOutcomeSuperPriorityInsidePage } from '../pages/viptt-outcome-super-priority-inside-page';
import { vipttOutcomeSuperPriorityOutsidePage } from '../pages/viptt-outcome-super-priority-outside-page';

export type Pages = {
  basePage: basePage;
  vipttStartPage: vipttStartPage;
  vipttWereYouInTheUKWhenYouAppliedForYourVisaPage: vipttWereYouInTheUKWhenYouAppliedForYourVisaPage;
  vipttDidYouPayForAPriorityServicePage: vipttDidYouPayForAPriorityServicePage;
  vipttDidYouApplyForAFamilyVisaPage: vipttDidYouApplyForAFamilyVisaPage;
  vipttWhyDidYouApplyForAVisaYesPage: vipttWhyDidYouApplyForAVisaYesPage;
  vipttWhyDidYouApplyForAVisaNoPage: vipttWhyDidYouApplyForAVisaNoPage;
  vipttFamilyVisasAndApplicationsToSettleInTheUKPage: vipttFamilyVisasAndApplicationsToSettleInTheUKPage;
  vipttDidYouApplyForAHealthAndWorkVisaPage: vipttDidYouApplyForAHealthAndWorkVisaPage;
  vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage: vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage;
  vipttOutcomeInsidePage: vipttOutcomeInsidePage;
  vipttOutcomeOutsidePage: vipttOutcomeOutsidePage;
  vipttOutcomePriorityInsidePage: vipttOutcomePriorityInsidePage;
  vipttOutcomePriorityOutsidePage: vipttOutcomePriorityOutsidePage;
  vipttOutcomeSuperPriorityInsidePage: vipttOutcomeSuperPriorityInsidePage;
  vipttOutcomeSuperPriorityOutsidePage: vipttOutcomeSuperPriorityOutsidePage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    const pageObjects = {
      basePage: new basePage(page),
      vipttStartPage: new vipttStartPage(page),
      vipttWereYouInTheUKWhenYouAppliedForYourVisaPage: new vipttWereYouInTheUKWhenYouAppliedForYourVisaPage(page),
      vipttDidYouPayForAPriorityServicePage: new vipttDidYouPayForAPriorityServicePage(page),
      vipttDidYouApplyForAFamilyVisaPage: new vipttDidYouApplyForAFamilyVisaPage(page),
      vipttWhyDidYouApplyForAVisaYesPage: new vipttWhyDidYouApplyForAVisaYesPage(page),
      vipttWhyDidYouApplyForAVisaNoPage: new vipttWhyDidYouApplyForAVisaNoPage(page),
      vipttFamilyVisasAndApplicationsToSettleInTheUKPage: new vipttFamilyVisasAndApplicationsToSettleInTheUKPage(page),
      vipttDidYouApplyForAHealthAndWorkVisaPage: new vipttDidYouApplyForAHealthAndWorkVisaPage(page),
      vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage: new vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage(page),
      vipttOutcomeInsidePage: new vipttOutcomeInsidePage(page),
      vipttOutcomeOutsidePage: new vipttOutcomeOutsidePage(page),
      vipttOutcomePriorityInsidePage: new vipttOutcomePriorityInsidePage(page),
      vipttOutcomePriorityOutsidePage: new vipttOutcomePriorityOutsidePage(page),
      vipttOutcomeSuperPriorityInsidePage: new vipttOutcomeSuperPriorityInsidePage(page),
      vipttOutcomeSuperPriorityOutsidePage: new vipttOutcomeSuperPriorityOutsidePage(page),
    };
    await use(pageObjects);
  },
});

export const expect = test.expect;
