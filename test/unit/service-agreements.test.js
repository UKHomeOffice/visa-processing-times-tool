const ServiceAgreements = require('../../apps/viptt/models/service-agreements');
const slaData = require('./mock-data/mock_sla_data');

describe('ServiceAgreements', () => {
  let serviceAgreements;
  const mockSLAData = JSON.parse(JSON.stringify(slaData));

  beforeEach(() => {
    serviceAgreements = new ServiceAgreements();
    // Override the _serviceAgreementData property with mock data
    serviceAgreements._serviceAgreementData = mockSLAData.default;
  });

  describe('getSLAData', () => {
    test('returns correct SLA for inside-uk', () => {
      const applicationType = 'inside-uk';
      const applicationTypeOption = 'visit-as-tourist-or-see-family';
      expect(serviceAgreements.getSLAData(applicationType, applicationTypeOption)).toEqual({
        weeks: '8',
        days: '40'
      });
    });

    test('returns correct SLA for outside-uk', () => {
      const applicationType = 'outside-uk';
      const applicationTypeOption = 'visit-as-tourist-or-see-family';
      expect(serviceAgreements.getSLAData(applicationType, applicationTypeOption)).toEqual({
        weeks: '3',
        days: '15'
      });
    });

    test('returns correct SLA for priority service', () => {
      const applicationType = 'premium';
      const applicationTypeOption = 'premium-priority';
      expect(serviceAgreements.getSLAData(applicationType, applicationTypeOption)).toEqual({
        weeks: '1',
        days: '5'
      });
    });

    test('returns correct SLA for super priority service', () => {
      const applicationType = 'premium';
      const applicationTypeOption = 'premium-super-priority';
      expect(serviceAgreements.getSLAData(applicationType, applicationTypeOption)).toEqual({
        weeks: '0.2',
        days: '1'
      });
    });

    test('throws if option cannot be found', () => {
      const applicationType = 'outside-uk';
      const applicationTypeOption = 'this-is-a-test';
      expect(() => serviceAgreements.getSLAData(applicationType, applicationTypeOption))
        .toThrow(/Unknown SLA option/);
    });

    test('throws if application type is unknown', () => {
      expect(() => serviceAgreements.getSLAData('unknown-application-type', 'visit-as-tourist-or-see-family'))
        .toThrow(/Unknown SLA application type/);
    });
  });

  describe('validatePositiveNumeric', () => {
    const applicationType = 'inside-uk';
    const applicationTypeOption = 'test-option';

    test('accepts trimmed positive string', () => {
      expect(() => serviceAgreements
        .validatePositiveNumeric(' 5 ', 'days', applicationType, applicationTypeOption)).not.toThrow();
    });

    test('accepts positive number', () => {
      expect(() => serviceAgreements
        .validatePositiveNumeric(7, 'weeks', applicationType, applicationTypeOption)).not.toThrow();
    });

    test('throws on missing value (empty string)', () => {
      expect(() => serviceAgreements.validatePositiveNumeric('', 'days', applicationType, applicationTypeOption))
        .toThrow(/Invalid SLA entry for inside-uk\.test-option: missing days/);
    });

    test('throws on missing value (null)', () => {
      expect(() => serviceAgreements.validatePositiveNumeric(null, 'weeks', applicationType, applicationTypeOption))
        .toThrow(/Invalid SLA entry for inside-uk\.test-option: missing weeks/);
    });

    test('throws on invalid numeric string', () => {
      expect(() => serviceAgreements.validatePositiveNumeric('abc', 'days', applicationType, applicationTypeOption))
        .toThrow(/Invalid SLA entry for inside-uk\.test-option: invalid days 'abc'/);
    });

    test('throws on non-positive numbers (0 and negative)', () => {
      expect(() => serviceAgreements.validatePositiveNumeric(0, 'days', applicationType, applicationTypeOption))
        .toThrow(/Invalid SLA entry for inside-uk\.test-option: invalid days '0'/);
      expect(() => serviceAgreements.validatePositiveNumeric(-1, 'weeks', applicationType, applicationTypeOption))
        .toThrow(/Invalid SLA entry for inside-uk\.test-option: invalid weeks '-1'/);
    });
  });

  describe('validateDatasetLoaded', () => {
    test('throws when dataset is missing (null)', () => {
      expect(() => serviceAgreements.validateDatasetLoaded(null)).toThrow('SLA Dataset not loaded');
    });

    test('throws when dataset is missing (undefined)', () => {
      expect(() => serviceAgreements.validateDatasetLoaded(undefined)).toThrow('SLA Dataset not loaded');
    });

    test('does not throw when dataset is present', () => {
      expect(() => serviceAgreements.validateDatasetLoaded({ some: 'data' })).not.toThrow();
    });
  });

  describe('validateStringArg', () => {
    test('accepts a string', () => {
      expect(() => serviceAgreements.validateStringArg('inside-uk', 'applicationType')).not.toThrow();
    });

    test('throws for number', () => {
      expect(() => serviceAgreements.validateStringArg(123, 'applicationType'))
        .toThrow('Invalid arguments: applicationType must be a string');
    });

    test('throws for null', () => {
      expect(() => serviceAgreements.validateStringArg(null, 'applicationTypeOption'))
        .toThrow('Invalid arguments: applicationTypeOption must be a string');
    });

    test('throws for undefined', () => {
      expect(() => serviceAgreements.validateStringArg(undefined, 'applicationTypeOption'))
        .toThrow('Invalid arguments: applicationTypeOption must be a string');
    });

    test('throws for object', () => {
      expect(() => serviceAgreements.validateStringArg({ key: 'value' }, 'applicationType'))
        .toThrow('Invalid arguments: applicationType must be a string');
    });
  });
});
