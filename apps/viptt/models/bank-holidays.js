'use strict';

const _ = require('lodash');
const Model = require('hof').model;
const fs = require('fs/promises');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const bankHolidaysApi = config.bankHolidaysApi;

const BH_FILE_PATH = '/../data/bank_hols_data.json';
const DEFAULT_COUNTRY = 'england-and-wales';

/**
 * Bank Holidays data model
 * This model is responsible for loading and saving bank holiday data
 */
module.exports = class BankHolidays {
  /**
   * @param {string} country
   */
  constructor(country) {
    // Can use bank holiday data from England and Wales, Scotland and Northern Ireland
    // However the requirements are for us to only use England and Wales bank hols for now
    this._country = country || DEFAULT_COUNTRY;
  }

  /**
   * Check if the bank holiday data is valid
   * @param {Object} data
   * @returns
   */
  checkDataIsValid(data) {
    return !!_.get(data, `[${this._country}].events`);
  }

  /**
   * Load the bank holidays data from the file
   * @returns {Promise}
   */
  async loadBankHolidays() {
    try {
      // Loading bank holidays is required here to ensure a fresh read of the file each time. This is due
      // to the fact the running service actively updates it through periodic automated API calls.
      const fileName = `${__dirname}${BH_FILE_PATH}`;
      const rawDates = await fs.readFile(fileName, { encoding: 'utf8' }, err => {
        if (err) {
          return Promise.reject(new Error(`Failed to load Bank Holidays data from file:
            ${err}`));
        }
        return err;
      });

      const dates = JSON.parse(rawDates);

      // Check if data loaded from file is correct
      if (!this.checkDataIsValid(dates)) {
        return Promise.reject(new Error('Bank Holidays data from file is invalid'));
      }

      const allDatesByCountry = dates[this._country].events;
      this._bankHolidayData = _.sortBy(allDatesByCountry, 'date');

      // return this._bankHolidayData;
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(new Error(`Bank Holidays File Read Failure: ${e.message}`));
    }
  }

  /**
   * Fetch back holiday data from api and save it to a file
   * @returns {Promise}
   */
  async saveBankHolidays() {
    try {
      const model = new Model();
      const params = {
        url: bankHolidaysApi,
        method: 'GET'
      };

      const data = await model.fetch(params);

      // Check if we successfully fetched data from API
      if (!this.checkDataIsValid(data)) {
        return Promise.reject(new Error('Failed to retrieve data from Bank Holidays API'));
      }

      const fileName = `${__dirname}${BH_FILE_PATH}`;
      return await fs.writeFile(fileName, JSON.stringify(data, null, 2), { flag: 'w+' });
    } catch (error) {
      return Promise.reject(new Error(`Error fetching bank holidays:  ${error}`));
    }
  }

  /**
   * Check if the date is a bank holiday
   * @param {moment} date
   * @returns {boolean}
   */
  isBankHoliday(date) {
    const formattedDate = date.format(inputDateFormat);
    return !!_.find(this._bankHolidayData, { date: formattedDate });
  }

  /**
   * Check if the date is on a weekend
   * @param {moment} date
   * @returns {boolean}
   */
  isWeekend(date) {
    const day = new Date(date).getDay();
    return (day === 6) || (day === 0);
  }

  /**
   * Check if the date is a working day
   * @param {moment} date
   * @returns {boolean}
   */
  isWorkingDay(date) {
    return !this.isWeekend(date) && !this.isBankHoliday(date);
  }
};
