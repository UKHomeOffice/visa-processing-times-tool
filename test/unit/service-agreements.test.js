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
    test('getSLAData returns correct sla data from a given reason inside UK', () => {
      const reason = 'visit-as-tourist-or-see-family';
      const insideUK = true;
      expect(serviceAgreements.getSLAData(reason, insideUK)).toEqual({
        weeks: '8',
        days: '40'
      });
    });

    test('getSLAData returns correct sla data from a given reason outside UK', () => {
      const reason = 'visit-as-tourist-or-see-family';
      const insideUK = false;
      expect(serviceAgreements.getSLAData(reason, insideUK)).toEqual({
        weeks: '3',
        days: '15'
      });
    });

    test('getSLAData returns null if reason cannot be found', () => {
      const reason = 'this-is-a-test';
      const insideUK = false;
      expect(serviceAgreements.getSLAData(reason, insideUK)).toBe(null);
    });
  });
});
