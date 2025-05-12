const moment = require('moment');
const BankHolidays = require('../../apps/viptt/models/bank-holidays');
const bankHols = require('./mock-data/mock_bank_hols_data');
const SlaCalculator = require('../../apps/viptt/models/sla-calculator');
const { displayDateFormat } = require('../../config');

describe('SlaCalculator', () => {
  let bankHolidays;
  const mockBankHolidaysData = JSON.parse(JSON.stringify(bankHols));

  let slaCalculator;

  beforeEach(() => {
    // Create bank holidays needed by sla calculator
    bankHolidays = new BankHolidays();

    // Override the _bankHolidayData property with mock data
    bankHolidays._bankHolidayData = mockBankHolidaysData;

    // Sla calculator that we will test
    slaCalculator = new SlaCalculator(bankHolidays);
  });

  describe('calculateReplyEstimate', () => {
    test('calculateReplyEstimate returns correct estimated reply date', () => {
      const verificationDate = '2025-04-15';
      const slaDays = 15;

      // Should land on Friday 9th May 2025
      const estimatedReplyDate = slaCalculator.calculateReplyEstimate(
        verificationDate,
        slaDays
      );
      expect(estimatedReplyDate.format(displayDateFormat)).toBe('9 May 2025');
    });

    test('calculateReplyEstimate return the next working day if sla estimate ends on a weekend', () => {
      const verificationDate = '2025-04-15';
      const slaDays = 16;

      // Should land on Monday 12th May 2025
      const estimatedReplyDate = slaCalculator.calculateReplyEstimate(
        verificationDate,
        slaDays
      );
      expect(estimatedReplyDate.format(displayDateFormat)).toBe('12 May 2025');
    });

    test('calculateReplyEstimate return the next working day if sla estimate ends on a bank holiday', () => {
      const verificationDate = '2025-04-10';
      const slaDays = 15;

      // Should land on Monday 6th May 2025
      const estimatedReplyDate = slaCalculator.calculateReplyEstimate(
        verificationDate,
        slaDays
      );
      expect(estimatedReplyDate.format(displayDateFormat)).toBe('6 May 2025');
    });
  });

  describe('addWorkingDays', () => {
    test('addWorkingDays adds days excluding bank holidays and weekends (test 1)', () => {
      const testDate = moment('2025-04-15');
      const daysToAdd = 5;
      const newDate = slaCalculator.addWorkingDays(testDate, daysToAdd);
      expect(newDate.format(displayDateFormat)).toBe('24 April 2025');
    });

    test('addWorkingDays adds days excluding bank holidays and weekends (test 2)', () => {
      const testDate = moment('2025-04-15');
      const daysToAdd = 6;
      const newDate = slaCalculator.addWorkingDays(testDate, daysToAdd);
      expect(newDate.format(displayDateFormat)).toBe('25 April 2025');
    });

    test('addWorkingDays returns same day when zero days are added', () => {
      const testDate = moment('2025-04-15');
      const daysToAdd = 0;
      const newDate = slaCalculator.addWorkingDays(testDate, daysToAdd);
      expect(newDate.format(displayDateFormat)).toBe('15 April 2025');
    });

    test('addWorkingDays returns same day when negative days are added', () => {
      const testDate = moment('2025-04-15');
      const daysToAdd = -5;
      const newDate = slaCalculator.addWorkingDays(testDate, daysToAdd);
      expect(newDate.format(displayDateFormat)).toBe('15 April 2025');
    });
  });

  describe('goToNextWorkingDay', () => {
    test('goToNextWorkingDay stays on same day if not a weekend or bank holiday', () => {
      const testDate = moment('2025-04-15');
      const newDate = slaCalculator.goToNextWorkingDay(testDate);
      expect(newDate.format(displayDateFormat)).toBe('15 April 2025');
    });

    test('goToNextWorkingDay advances day if it is a weekend', () => {
      const testDate = moment('2025-04-12');
      const newDate = slaCalculator.goToNextWorkingDay(testDate);
      expect(newDate.format(displayDateFormat)).toBe('14 April 2025');
    });

    test('goToNextWorkingDay advances day if it is a bank holiday', () => {
      const testDate = moment('2025-04-21');
      const newDate = slaCalculator.goToNextWorkingDay(testDate);
      expect(newDate.format(displayDateFormat)).toBe('22 April 2025');
    });
  });

  describe('isWithinEstimate', () => {
    test('isWithinEstimate returns true if current date is before reply date', () => {
      const currentDate = moment('2025-04-12');
      const replyDate = moment('2025-04-15');
      const isWithin = slaCalculator.isWithinEstimate(replyDate, currentDate);
      expect(isWithin).toBe(true);
    });

    test('isWithinEstimate returns true if current date is the same as reply date', () => {
      const currentDate = moment('2025-04-15');
      const replyDate = moment('2025-04-15');
      const isWithin = slaCalculator.isWithinEstimate(replyDate, currentDate);
      expect(isWithin).toBe(true);
    });

    test('isWithinEstimate returns false if current date is after reply date', () => {
      const currentDate = moment('2025-04-16');
      const replyDate = moment('2025-04-15');
      const isWithin = slaCalculator.isWithinEstimate(replyDate, currentDate);
      expect(isWithin).toBe(false);
    });
  });
});
