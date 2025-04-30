module.exports = {
  'were-you-in-uk': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'yes',
      'no'
    ]
  },
  'why-did-you-apply-inside': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'study-exam-or-school-exchange',
      'visit-as-tourist-or-see-family',
      'work-or-business-related-meetings',
      'lecture-research-or-academic-placement',
      'bno-with-connections-to-hk',
      'something-else'
    ]
  },
  'why-did-you-apply-outside': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'visa-type',
      'something-else'
    ]
  },
  'health-care-worker-visa': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'yes',
      'no'
    ]
  },
  'temporary-field': {
    mixin: 'radio-group',
    isPageHeading: true,
    validate: ['required'],
    options: [
      'yes',
      'no'
    ]
  }
};
