import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

Given('I visit the Visa Processing Times Tool page', async ({ pages }) => {
  await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.openViptt();
  await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.acceptCookiesAndHideMessage();
});

When('I fill out VIPTT form for scenario {string}', async ({ pages }, scenario: string) => {
  switch (scenario.toLowerCase()) {
    case 't1: in uk, for work, health/care yes, in sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_YES);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.ANSWER_NO);
      await pages.vipttWhyDidYouApplyForAVisaYesPage.answerVisaPurpose(c.FOR_WORK_LABEL);
      await pages.vipttDidYouApplyForAHealthAndWorkVisaPage.answerHealthAndCareWorkVisa(c.ANSWER_YES);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.IN_SLA);
      break;
    }
    case 't2: in uk, to study, out of sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_YES);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.ANSWER_NO);
      await pages.vipttWhyDidYouApplyForAVisaYesPage.answerVisaPurpose(c.TO_STUDY_LABEL);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.OUT_OF_SLA);
      break;
    }
    case 't3: in uk, something else': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_YES);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.ANSWER_NO);
      await pages.vipttWhyDidYouApplyForAVisaYesPage.answerVisaPurpose(c.SOMETHING_ELSE_LABEL);
      break;
    }
    case 't4: not in uk, to get married, in sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_NO);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.ANSWER_NO);
      await pages.vipttWhyDidYouApplyForAVisaNoPage.answerVisaPurpose(c.TO_GET_MARRIED_LABEL);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.IN_SLA);
      break;
    }
    case 't5: not in uk, to travel, out of sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_NO);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.ANSWER_NO);
      await pages.vipttWhyDidYouApplyForAVisaNoPage.answerVisaPurpose(c.TO_TRAVEL_LABEL);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.OUT_OF_SLA);
      break;
    }
    case 't6: not in uk, something else': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_NO);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.ANSWER_NO);
      await pages.vipttWhyDidYouApplyForAVisaNoPage.answerVisaPurpose(c.SOMETHING_ELSE_LABEL);
      break;
    }
    case 't7: in uk, priority, family visa yes': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_YES);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.PRIORITY);
      await pages.vipttDidYouApplyForAFamilyVisaPage.answerFamilyVisa(c.ANSWER_YES);
      break;
    }
    case 't8: in uk, priority, in sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_YES);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.PRIORITY);
      await pages.vipttDidYouApplyForAFamilyVisaPage.answerFamilyVisa(c.ANSWER_NO);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.PRIORITY_IN_SLA);
      break;
    }
    case 't9: in uk, priority, out of sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_YES);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.PRIORITY);
      await pages.vipttDidYouApplyForAFamilyVisaPage.answerFamilyVisa(c.ANSWER_NO);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.PRIORITY_OUT_OF_SLA);
      break;
    }
    case 't10: not in uk, priority, family visa yes': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_NO);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.SUPER_PRIORITY);
      await pages.vipttDidYouApplyForAFamilyVisaPage.answerFamilyVisa(c.ANSWER_YES);
      break;
    }
    case 't11: in uk, super priority, in sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_NO);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.SUPER_PRIORITY);
      await pages.vipttDidYouApplyForAFamilyVisaPage.answerFamilyVisa(c.ANSWER_NO);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.SUPER_PRIORITY_IN_SLA);
      break;
    }
    case 't12: in uk, super priority, out of sla': {
      await pages.vipttWereYouInTheUKWhenYouAppliedForYourVisaPage.answerWereYouInTheUk(c.ANSWER_NO);
      await pages.vipttDidYouPayForAPriorityServicePage.answerPriorityService(c.SUPER_PRIORITY);
      await pages.vipttDidYouApplyForAFamilyVisaPage.answerFamilyVisa(c.ANSWER_NO);
      await pages.vipttWhenDidYouVerifyYourIdentityByProvidingYourBiometricsPage.answerBiometricsDateBySla(c.SUPER_PRIORITY_OUT_OF_SLA);
      break;
    }
    default:
      throw new Error(`Unsupported VIPTT scenario: ${scenario}`);
  }
});

Then('I should see {string} page', async ({ pages }, pageTitle: string) => {
  await pages.basePage.assertPageTitle(pages.basePage.page, pageTitle);
});

