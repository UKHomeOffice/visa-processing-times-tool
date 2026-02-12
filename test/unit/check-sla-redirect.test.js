// Mock dependencies first so the behaviour imports receive mocked modules
jest.mock('moment', () => jest.requireActual('moment'));
jest.mock('../../apps/viptt/models/sla-calculator');
jest.mock('../../apps/viptt/models/bank-holidays');
jest.mock('../../apps/viptt/models/service-agreements');
jest.mock('../../apps/viptt/models/sla-outcome');

const moment = require('moment');
const CheckSlaRedirect = require('../../apps/viptt/behaviours/check-sla-redirect');
const SlaCalculator = require('../../apps/viptt/models/sla-calculator');
const BankHolidays = require('../../apps/viptt/models/bank-holidays');
const ServiceAgreements = require('../../apps/viptt/models/service-agreements');
const Outcome = require('../../apps/viptt/models/sla-outcome');

const displayDateFormat = 'D MMMM YYYY';
const inputDateFormat = 'YYYY-MM-DD';

describe('check-sla-redirect behaviour', () => {
  let req;
  let res;
  let next;
  let sessionModel;
  let SuperClass;
  let Behaviour;
  let instance;

  beforeEach(() => {
    jest.clearAllMocks();
    sessionModel = {
      get: jest.fn(),
      set: jest.fn()
    };
    req = {
      sessionModel,
      baseUrl: '/base'
    };
    res = {
      redirect: jest.fn()
    };
    next = jest.fn();

    // Mock BankHolidays
    BankHolidays.mockImplementation(() => ({
      loadBankHolidays: jest.fn().mockResolvedValue()
    }));

    // Mock ServiceAgreements
    ServiceAgreements.mockImplementation(() => ({
      getSLAData: jest.fn().mockReturnValue({ days: 10, weeks: 2 })
    }));

    // Mock SlaCalculator
    SlaCalculator.mockImplementation(() => ({
      calculateReplyEstimate: jest.fn((date, days) => moment(date, inputDateFormat).add(days, 'days')),
      isWithinEstimate: jest.fn().mockReturnValue(true)
    }));

    // Mock Outcome
    Outcome.mockImplementation(() => ({
      getOutcomePath: jest.fn().mockReturnValue('outcome-page')
    }));

    SuperClass = class {};
    Behaviour = CheckSlaRedirect(SuperClass);
    instance = new Behaviour();
  });

  it('should redirect to the correct outcome page for inside UK, normal application', async () => {
    const captured = { applicationType: null, applicationTypeOption: null };
    ServiceAgreements.mockImplementation(() => ({
      getSLAData: jest.fn((applicationType, applicationTypeOption) => {
        captured.applicationType = applicationType;
        captured.applicationTypeOption = applicationTypeOption;
        return { days: 10, weeks: 2 };
      })
    }));
    // Recreate behaviour instance to use updated mock
    Behaviour = CheckSlaRedirect(SuperClass);
    instance = new Behaviour();
    sessionModel.get.mockImplementation(key => {
      const map = {
        'were-you-in-uk': 'yes',
        'why-did-you-apply-inside': 'study',
        premium: 'premium-none',
        'identity-verification-date': '2025-06-01'
      };
      return map[key];
    });

    await instance.successHandler(req, res, next);

    expect(BankHolidays).toHaveBeenCalled();
    expect(ServiceAgreements).toHaveBeenCalled();
    expect(SlaCalculator).toHaveBeenCalled();
    expect(captured).toEqual({ applicationType: 'inside-uk', applicationTypeOption: 'study' });
    expect(sessionModel.set).toHaveBeenCalledWith('application-start-date', moment('2025-06-01', inputDateFormat)
      .format(displayDateFormat));
    expect(sessionModel.set).toHaveBeenCalledWith('estimated-reply-date', expect.any(String));
    expect(sessionModel.set).toHaveBeenCalledWith('sla-weeks', 2);
    expect(sessionModel.set).toHaveBeenCalledWith('sla-days', 10);
    expect(res.redirect).toHaveBeenCalledWith('/base/outcome-page');
  });

  it('should override reason for health care worker visa inside UK', async () => {
    const captured = { applicationType: null, applicationTypeOption: null };
    ServiceAgreements.mockImplementation(() => ({
      getSLAData: jest.fn((applicationType, applicationTypeOption) => {
        captured.applicationType = applicationType;
        captured.applicationTypeOption = applicationTypeOption;
        return { days: 10, weeks: 2 };
      })
    }));
    // Recreate behaviour instance to use updated mock
    Behaviour = CheckSlaRedirect(SuperClass);
    instance = new Behaviour();
    sessionModel.get.mockImplementation(key => {
      const map = {
        'were-you-in-uk': 'yes',
        'why-did-you-apply-inside': 'work-or-business-related-meetings',
        'health-care-worker-visa': 'yes',
        premium: 'premium-none',
        'identity-verification-date': '2025-06-01'
      };
      return map[key];
    });

    await instance.successHandler(req, res, next);

    expect(captured).toEqual({
      applicationType: 'inside-uk',
      applicationTypeOption: 'work-visa-health-and-care'
    });
    expect(res.redirect).toHaveBeenCalledWith('/base/outcome-page');
  });

  it('should not override when health care worker visa is not selected inside UK', async () => {
    const captured = { applicationType: null, applicationTypeOption: null };
    ServiceAgreements.mockImplementation(() => ({
      getSLAData: jest.fn((applicationType, applicationTypeOption) => {
        captured.applicationType = applicationType;
        captured.applicationTypeOption = applicationTypeOption;
        return { days: 10, weeks: 2 };
      })
    }));
    // Recreate behaviour instance to use updated mock
    Behaviour = CheckSlaRedirect(SuperClass);
    instance = new Behaviour();

    sessionModel.get.mockImplementation(key => {
      const map = {
        'were-you-in-uk': 'yes',
        'why-did-you-apply-inside': 'work-or-business-related-meetings',
        'health-care-worker-visa': 'no',
        premium: 'premium-none',
        'identity-verification-date': '2025-06-01'
      };
      return map[key];
    });

    await instance.successHandler(req, res, next);
    expect(captured).toEqual({
      applicationType: 'inside-uk',
      applicationTypeOption: 'work-or-business-related-meetings'
    });
    expect(res.redirect).toHaveBeenCalledWith('/base/outcome-page');
  });

  it('should use outside UK reason if not inside UK', async () => {
    const captured = { applicationType: null, applicationTypeOption: null };
    ServiceAgreements.mockImplementation(() => ({
      getSLAData: jest.fn((applicationType, applicationTypeOption) => {
        captured.applicationType = applicationType;
        captured.applicationTypeOption = applicationTypeOption;
        return { days: 10, weeks: 2 };
      })
    }));
    // Recreate behaviour instance to use updated mock
    Behaviour = CheckSlaRedirect(SuperClass);
    instance = new Behaviour();
    sessionModel.get.mockImplementation(key => {
      const map = {
        'were-you-in-uk': 'no',
        'why-did-you-apply-outside': 'visit',
        premium: 'premium-none',
        'identity-verification-date': '2025-06-01'
      };
      return map[key];
    });

    await instance.successHandler(req, res, next);

    expect(captured).toEqual({ applicationType: 'outside-uk', applicationTypeOption: 'visit' });
    expect(res.redirect).toHaveBeenCalledWith('/base/outcome-page');
  });

  it('should use premium SLA data if premium option is selected', async () => {
    const captured = { applicationType: null, applicationTypeOption: null };
    ServiceAgreements.mockImplementation(() => ({
      getSLAData: jest.fn((applicationType, applicationTypeOption) => {
        captured.applicationType = applicationType;
        captured.applicationTypeOption = applicationTypeOption;
        return { days: 10, weeks: 2 };
      })
    }));
    // Recreate behaviour instance to use updated mock
    Behaviour = CheckSlaRedirect(SuperClass);
    instance = new Behaviour();
    sessionModel.get.mockImplementation(key => {
      const map = {
        'were-you-in-uk': 'yes',
        'why-did-you-apply-inside': 'study',
        premium: 'premium-priority',
        'identity-verification-date': '2025-06-01'
      };
      return map[key];
    });

    await instance.successHandler(req, res, next);

    expect(captured).toEqual({ applicationType: 'premium', applicationTypeOption: 'premium-priority' });
    expect(res.redirect).toHaveBeenCalledWith('/base/outcome-page');
  });

  it('should handle baseUrl being /', async () => {
    req.baseUrl = '/';
    sessionModel.get.mockImplementation(key => {
      const map = {
        'were-you-in-uk': 'yes',
        'why-did-you-apply-inside': 'study',
        premium: undefined,
        'identity-verification-date': '2025-06-01'
      };
      return map[key];
    });

    await instance.successHandler(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith('/outcome-page');
  });

  it('should call next with error if exception is thrown', async () => {
    BankHolidays.mockImplementation(() => ({
      loadBankHolidays: jest.fn().mockRejectedValue(new Error('fail'))
    }));

    await instance.successHandler(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
