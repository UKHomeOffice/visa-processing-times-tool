'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';

module.exports = {
  PRETTY_DATE_FORMAT: 'Do MMMM YYYY',
  dateTimeFormat: 'DD MMM YYYY HH:mm:ss',
  env: env,
  email: {
    notifyApiKey: process.env.NOTIFY_KEY,
    notifyTemplate: process.env.NOTIFY_TEMPLATE,
    caseWorker: process.env.CASEWORKER_EMAIL
  },
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
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
  upload: {
    maxFileSizeInBytes: 25 * 1000 * 1000, // 25MB in bytes
    hostname: process.env.FILE_VAULT_URL,
    allowedMimeTypes: [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'application/pdf',
      'text/plain',
      'text/html',
      'application/vnd',
      'message/rfc822',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/rtf',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/xml'
    ]
  }
};
