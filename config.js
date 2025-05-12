'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';

module.exports = {
  bankHolidaysApi: 'https://www.gov.uk/bank-holidays.json',
  inputDateFormat: 'YYYY-MM-DD',
  displayDateFormat: 'D MMMM YYYY',
  env: env,
  survey: {
    urls: {
      root: 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=coa/',
      acq: 'https://eforms.homeoffice.gov.uk/outreach/Feedback.ofml?FormName=coa/'
    }
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  }
};
