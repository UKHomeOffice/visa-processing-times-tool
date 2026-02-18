const hof = require('hof');
const summary = hof.components.summary;
const checkSlaRedirect = require('./behaviours/check-sla-redirect');
const { disallowIndexing } = require('../../config');

const pages = {};
if (disallowIndexing) {
  pages['/robots.txt'] = 'static/robots';
}

module.exports = {
  name: 'VIPTT',
  fields: 'apps/viptt/fields',
  views: 'apps/viptt/views',
  translations: 'apps/viptt/translations',
  baseUrl: '/',
  pages: pages,
  steps: {
    '/location': {
      fields: ['were-you-in-uk'],
      next: '/priority'
    },
    '/priority': {
      fields: ['premium'],
      forks: [
        {
          target: '/application-reason-inside-uk',
          condition: req => req.sessionModel.get('premium') === 'premium-none' &&
            req.sessionModel.get('were-you-in-uk') === 'yes'
        },
        {
          target: '/application-reason-outside-uk',
          condition: req => req.sessionModel.get('premium') === 'premium-none' &&
            req.sessionModel.get('were-you-in-uk') === 'no'
        }
      ],
      next: '/family-visa'
    },
    '/family-visa': {
      fields: ['applied-for-family-visa'],
      forks: [
        {
          target: '/out-of-scope',
          condition: {
            field: 'applied-for-family-visa',
            value: 'yes'
          }
        }
      ],
      next: '/biometrics'
    },
    '/application-reason-inside-uk': {
      fields: ['why-did-you-apply-inside'],
      forks: [
        {
          target: '/work-visa-types-inside-uk',
          condition: {
            field: 'why-did-you-apply-inside',
            value: 'work-or-business-related-meetings'
          }
        },
        {
          target: '/out-of-scope',
          condition: {
            field: 'why-did-you-apply-inside',
            value: 'something-else'
          }
        }
      ],
      next: '/biometrics'
    },
    '/application-reason-outside-uk': {
      fields: ['why-did-you-apply-outside'],
      forks: [
        {
          target: '/out-of-scope',
          condition: {
            field: 'why-did-you-apply-outside',
            value: 'something-else'
          }
        }
      ],
      next: '/biometrics'
    },
    '/work-visa-types-inside-uk': {
      fields: ['health-care-worker-visa'],
      next: '/biometrics'
    },
    '/out-of-scope': {
    },
    '/biometrics': {
      fields: ['identity-verification-date'],
      behaviours: [checkSlaRedirect]
    },
    '/outcome-inside': {
      behaviours: ['complete', summary],
      backLink: false
    },
    '/outcome-outside': {
      behaviours: ['complete', summary],
      backLink: false
    },
    '/priority-outcome-inside': {
      behaviours: ['complete', summary],
      backLink: false
    },
    '/superpriority-outcome-inside': {
      behaviours: ['complete', summary],
      backLink: false
    },
    '/priority-outcome-outside': {
      behaviours: ['complete', summary],
      backLink: false
    },
    '/superpriority-outcome-outside': {
      behaviours: ['complete', summary],
      backLink: false
    },
    '/accessibility': {},
    '/exit': {}
  }
};
