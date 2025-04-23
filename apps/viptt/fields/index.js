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
      'visa-type',
      'work',
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
