const moment = require('moment');
const SlaCalculator = require('../models/sla-calculator');
const BankHolidays = require('../models/bank-holidays');
const ServiceAgreements = require('../models/service-agreements');
const Outcome = require('../models/sla-outcome');
const { displayDateFormat, inputDateFormat } = require('../../../config');

const INSIDE_UK = 'inside-uk';
const OUTSIDE_UK = 'outside-uk';
const PREMIUM = 'premium';

/**
 * Check if the user's expected visa reply date is within SLA
 * and redirect to correct page if this is true.
 */
module.exports = superclass =>
  class extends superclass {
    async successHandler(req, res, next) {
      try {
        // Bank Holiday model
        this._bankHolidays = new BankHolidays();
        await this._bankHolidays.loadBankHolidays();

        // SLA model
        this._serviceAgreements = new ServiceAgreements();

        // SLA calculation helper
        this._slaCalculator = new SlaCalculator(this._bankHolidays);

        // Get the user's reason for applying depending on
        // whether they were inside or outside UK.
        const insideUK = req.sessionModel.get('were-you-in-uk') === 'yes';
        let reasonForApplying = insideUK ?
          req.sessionModel.get('why-did-you-apply-inside') :
          req.sessionModel.get('why-did-you-apply-outside');

        // Special case for health care worker visa:
        // Check if the user has applied for a work visa while inside UK
        if (insideUK && reasonForApplying === 'work-or-business-related-meetings') {
          // Check if the user has selected the health care worker visa option
          const appliedForHealthCareVisa = req.sessionModel.get('health-care-worker-visa');
          if(appliedForHealthCareVisa === 'yes') {
            // Override the reason for applying to health and care visa
            reasonForApplying = 'work-visa-health-and-care';
          }
        }

        // Override premium options here.
        // Logic: if premium option is selected, get premium SLA data,
        // otherwise use the default case, reason for applying.
        const ukStatus = insideUK ? INSIDE_UK : OUTSIDE_UK;
        const premiumOption = req.sessionModel.get('premium');
        const isPremium = (premiumOption === 'premium-priority' || premiumOption === 'premium-super-priority');
        const applicationType = isPremium ? PREMIUM : ukStatus;
        const applicationTypeOption = isPremium ? premiumOption : reasonForApplying;
        const slaData = this._serviceAgreements.getSLAData(applicationType, applicationTypeOption);

        // Get the date that user submitted verified their identity.
        const verificationDate = req.sessionModel.get('identity-verification-date');

        // Calculate the estimated date by which we should have received a reply
        const estimatedReplyDate = this._slaCalculator.calculateReplyEstimate(
          verificationDate,
          slaData.days
        );

        // Add values that are needed to display in the outcome page
        const formattedInputDate = moment(verificationDate, inputDateFormat).format(displayDateFormat);
        req.sessionModel.set('application-start-date', formattedInputDate);
        req.sessionModel.set('estimated-reply-date', estimatedReplyDate.format(displayDateFormat));
        req.sessionModel.set('sla-weeks', slaData.weeks);
        req.sessionModel.set('sla-days', slaData.days);

        // Check if reply is still within the SLA timeline
        const insideSLA = this._slaCalculator.isWithinEstimate(estimatedReplyDate);

        // Use Outcome model to resolve destination and redirect
        this._outcome = new Outcome();
        const target = this._outcome.getOutcomePath(premiumOption, insideSLA);
        const base = req.baseUrl && req.baseUrl !== '/' ? req.baseUrl : '';
        return res.redirect(`${base}/${target}`);
      } catch (err) {
        return next(err);
      }
    }
  };
