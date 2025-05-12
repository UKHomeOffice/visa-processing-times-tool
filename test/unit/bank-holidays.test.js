const moment = require('moment');
const BankHolidays = require('../../apps/viptt/models/bank-holidays');
const bankHols = require('./mock-data/mock_bank_hols_data');

describe('BankHolidays', () => {
  let bankHolidays;
  const mockBankHolidaysData = JSON.parse(JSON.stringify(bankHols));

  beforeEach(() => {
    bankHolidays = new BankHolidays();
    // Override the _bankHolidayData property with mock data
    bankHolidays._bankHolidayData = mockBankHolidaysData;
  });

  describe('isBankHoliday', () => {
    test('isBankHoliday returns true if date is a bank holiday', () => {
      const testDate = moment('2025-08-25');
      const result = bankHolidays.isBankHoliday(testDate);
      expect(result).toBe(true);
    });

    test('isBankHoliday returns false if date is not a bank holiday', () => {
      const testDate = moment('2025-08-24');
      expect(bankHolidays.isBankHoliday(testDate)).toBe(false);
    });
  });

  describe('isWeekend', () => {
    test('isWeekend returns true if date is on a weekend', () => {
      const testDate = moment('2025-05-10');
      expect(bankHolidays.isWeekend(testDate)).toBe(true);
    });

    test('isWeekend returns false if date is not on a weekend', () => {
      const testDate = moment('2025-05-09');
      expect(bankHolidays.isWeekend(testDate)).toBe(false);
    });

    test('isWeekend returns false if date is a bank holiday but is not on a weekend', () => {
      const testDate = moment('2025-05-05');
      expect(bankHolidays.isWeekend(testDate)).toBe(false);
    });
  });

  describe('isWorkingDay', () => {
    test('isWorkingDay returns true if date is a work day', () => {
      const testDate = moment('2025-05-09');
      expect(bankHolidays.isWorkingDay(testDate)).toBe(true);
    });

    test('isWorkingDay returns false if date is a bank holiday', () => {
      const testDate = moment('2025-05-05');
      expect(bankHolidays.isWorkingDay(testDate)).toBe(false);
    });

    test('isWorkingDay returns false if date is on a weekend', () => {
      const testDate = moment('2025-05-10');
      expect(bankHolidays.isWorkingDay(testDate)).toBe(false);
    });
  });
});
