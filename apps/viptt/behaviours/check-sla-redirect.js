const SlaCalculator = require('../models/sla-calculator');
const BankHolidays = require('../models/bank-holidays');
const ServiceAgreements = require('../models/service-agreements');
/**
 * Check if the user's expected visa reply date is within SLA
 * and redirect to correct page if this is true.
 */
module.exports = superclass =>
  class extends superclass {
    async successHandler(req, res, next) {
      // Bank Holiday model
      this._bankHolidays = new BankHolidays();
      await this._bankHolidays.loadBankHolidays();

      // SLA model
      this._serviceAgreements = new ServiceAgreements();

      // Sla calculation helper
      this._slaCalculator = new SlaCalculator(this._bankHolidays);

      // Get the user's reason for applying depending on
      // whether they were inside or outside UK.
      const insideUK = req.sessionModel.get('were-you-in-uk') === 'yes';
      const reasonForApplying = insideUK ?
        req.sessionModel.get('why-did-you-apply-inside') :
        req.sessionModel.get('why-did-you-apply-outside');

      // Retrieve the correct sla data
      const slaData = this._serviceAgreements.getSLAData(reasonForApplying, insideUK);

      // Get the date that user submitted verified their identity.
      const verificationDate = req.sessionModel.get('identity-verification-date');

      // Calculate the estimated date by which we should have received a reply
      const estimatedReplyDate = this._slaCalculator.calculateReplyEstimate(
        verificationDate,
        slaData.days
      );

      // Check if reply is still within the SLA timeline
      const insideSLA = this._slaCalculator.isWithinEstimate(estimatedReplyDate);

      // Redirect if within SLA
      if (insideSLA) {
        return res.redirect(`${req.baseUrl}/outcome-inside`);
      }

      return super.successHandler(req, res, next);
    }
  };
