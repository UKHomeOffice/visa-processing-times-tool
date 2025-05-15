'use strict';

const moment = require('moment');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;

/**
 * SLA calculator
 * This class is responsible for calculating the estimated reply date
 * based on the input date and SLA days
 */
module.exports = class SLACalculator {
  /**
   * @param {BankHolidays} bankHolidays
   */
  constructor(bankHolidays) {
    this._bankHolidays = bankHolidays;
  }

  /**
   * @param {string} verificationDate
   * @param {string} slaDays
   * @returns {moment}
   */
  calculateReplyEstimate(verificationDate, slaDays) {
    // convert input date into a moment object
    const inputDate = moment(verificationDate, inputDateFormat);

    // start date for application has to be on a working day. If input date is
    // not a working day then it is moved forward to one to begin the calculation.
    const startDate = this.goToNextWorkingDay(inputDate.clone());

    // Add the SLA days to the start date
    const replyDate = this.addWorkingDays(startDate.clone(), slaDays);

    return replyDate;
  }

  /**
   * Add working days until the specified number of working days have been added.
   * If the added day is a non-working day (weekend or bank holiday),
   * we keep adding days until we get to a working day.
   * @param {moment} date
   * @param {number} daysToAdd
   * @returns {moment}
   */
  addWorkingDays(date, daysToAdd) {
    let count = 0;
    while (count < daysToAdd) {
      // Move to next day
      date.add(1, 'days');

      // Only increment count if the next day is a working day
      if (this._bankHolidays.isWorkingDay(date)) {
        count++;
      }
    }
    return date;
  }

  /**
   * If date is either the weekend or bank holiday then move to the next working day.
   * Note: this only moves the day forward if the supplied date is not a working day.
   * @param {moment} date
   * @returns {moment}
   */
  goToNextWorkingDay(date) {
    if (!this._bankHolidays.isWorkingDay(date)) {
      this.addWorkingDays(date, 1);
    }
    return date;
  }

  /**
   * Check if we have passed the estimated reply date
   * Reply date must be before or on same day as today
   * @param {moment} replyDate
   * @returns {boolean}
   */
  isWithinEstimate(replyDate, currentDate = moment()) {
    return !currentDate.isAfter(replyDate, 'day');
  }
};
