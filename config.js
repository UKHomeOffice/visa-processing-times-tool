'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';

module.exports = {
  bankHolidaysApi: 'https://www.gov.uk/bank-holidays.json',
  inputDateFormat: 'YYYY-MM-DD',
  displayDateFormat: 'D MMMM YYYY',
  env: env,
  bannerFeedbackUrl: 'https://homeoffice.eu.qualtrics.com/jfe/form/SV_9Qrx3WHZAYtpTj8?Source=BetaBanner',
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  deIndexForm: process.env.DEINDEX_FORM
};
