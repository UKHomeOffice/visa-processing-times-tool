
const moment = require('moment');
const BankHolidays = require('../../apps/viptt/models/bank-holidays');
const ServiceAgreements = require('../../apps/viptt/models/service-agreements');
const SlaCalculator = require('../../apps/viptt/models/sla-calculator');
const Behaviour = require('../../apps/viptt/behaviours/check-sla-redirect');
const reqres = require('hof').utils.reqres;

// Mock the required modules
jest.mock('../../apps/viptt/models/bank-holidays');
jest.mock('../../apps/viptt/models/service-agreements');
jest.mock('../../apps/viptt/models/sla-calculator');

// Mock required methods of ServiceAgreements
ServiceAgreements.mockImplementation(() => {
  return {
    getSLAData: () => {
      return {
        weeks: '3',
        days: '15'
      };
    }
  };
});

describe('check-sla-redirect', () => {
  test('Behaviour exports a function', () => {
    expect(typeof Behaviour).toBe('function');
  });

  class Base {
    successHandler() {}
  }

  let req;
  let res;
  let next;
  let CheckSlaRedirect;
  let instance;

  beforeEach(() => {
    BankHolidays.mockClear();
    ServiceAgreements.mockClear();
    SlaCalculator.mockClear();

    req = reqres.req();
    res = reqres.res();
    next = jest.fn();

    CheckSlaRedirect = Behaviour(Base);
    instance = new CheckSlaRedirect();
  });

  describe('The \'successHandler\' method', () => {
    const defaultSlaMock = {
      calculateReplyEstimate: () => {
        return moment('2025-05-09');
      },
      isWithinEstimate: () => false
    };

    beforeEach(() => {
      SlaCalculator.mockImplementation(() => {
        return defaultSlaMock;
      });

      Base.prototype.successHandler = jest.fn().mockReturnValue(req, res, next);
      res.redirect = jest.fn(() => '/outcome-inside');
      req.baseUrl = '';
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('successHandler was called', async () => {
      await instance.successHandler(req, res, next);
      expect(Base.prototype.successHandler).toHaveBeenCalled();
    });

    test('calls res.redirect if date is within reply estimate', async () => {
      SlaCalculator.mockImplementation(() => {
        return {
          ...defaultSlaMock,
          isWithinEstimate: () => true
        };
      });

      await instance.successHandler(req, res, next);
      expect(res.redirect).toHaveBeenCalledWith('/outcome-inside');
    });

    test('does not call res.redirect if  date is not within reply estimate', async () => {
      SlaCalculator.mockImplementation(() => {
        return {
          ...defaultSlaMock,
          isWithinEstimate: () => false
        };
      });

      await instance.successHandler(req, res, next);
      expect(res.redirect).not.toHaveBeenCalled();
    });
  });
});
