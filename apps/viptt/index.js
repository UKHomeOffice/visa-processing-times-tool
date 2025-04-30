const hof = require('hof');
const summary = hof.components.summary;

module.exports = {
  name: 'VIPTT',
  fields: 'apps/viptt/fields',
  // views: 'apps/viptt/views', // Uncomment if you have custom views
  translations: 'apps/viptt/translations',
  baseUrl: '/',
  steps: {
    '/location': {
      fields: ['were-you-in-uk'],
      forks: [
        {
          target: '/application-reason-inside-uk',
          condition: {
            field: 'were-you-in-uk',
            value: 'yes'
          }
        },
        {
          target: '/application-reason-outside-uk',
          condition: {
            field: 'were-you-in-uk',
            value: 'no'
          }
        }
      ],
      next: '/application-reason-inside-uk'
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
          target: '/biometrics',
          condition: {
            field: 'why-did-you-apply-outside',
            value: 'visa-type'
          }
        },
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
      fields: ['temporary-field'],
      forks: [
        {
          target: '/outcome-inside',
          condition: {
            field: 'temporary-field',
            value: 'yes'
          }
        },
        {
          target: '/outcome-outside',
          condition: {
            field: 'temporary-field',
            value: 'no'
          }
        }
      ],
      next: '/outcome-inside'
    },
    '/outcome-inside': {
      behaviours: ['complete', summary]
    },
    '/outcome-outside': {
      behaviours: ['complete', summary]
    }
  }
};
