export class ConstantsLib {
  private constructor() {}

  // VIPTT applicant answers used by the scenario steps
  static readonly ANSWER_YES = 'Yes';
  static readonly ANSWER_NO = 'No';
  static readonly PRIORITY = 'Priority';
  static readonly SUPER_PRIORITY = 'Super priority';

  // Priority service options
  static readonly PRIORITY_NO_LABEL = 'No, I did not pay for a faster decision';
  static readonly PRIORITY_LABEL = "Yes, I paid for the 'priority service'";
  static readonly SUPER_PRIORITY_LABEL = "Yes, I paid for the 'super priority service'";

  // Why did you apply for your visa options
  static readonly FOR_WORK_LABEL = 'For work';
  static readonly TO_STUDY_LABEL = 'To study';
  static readonly TO_GET_MARRIED_LABEL = 'To get married';
  static readonly TO_TRAVEL_LABEL = 'To travel';
  static readonly BNO_LABEL = "I'm a British National Overseas";
  static readonly SOMETHING_ELSE_LABEL = 'Something else';

  // Biometrics options used by VIPTT scenarios
  static readonly IN_SLA = 'in sla';
  static readonly OUT_OF_SLA = 'out sla';
  static readonly PRIORITY_IN_SLA = 'priority in';
  static readonly PRIORITY_OUT_OF_SLA = 'priority out';
  static readonly SUPER_PRIORITY_IN_SLA = 'super priority in';
  static readonly SUPER_PRIORITY_OUT_OF_SLA = 'super priority out';

  // Working days subtracted from today to derive the biometrics date
  static readonly WORKING_DAYS: Record<string, number> = {
    [ConstantsLib.IN_SLA]: 5,
    [ConstantsLib.OUT_OF_SLA]: 20,
    [ConstantsLib.PRIORITY_IN_SLA]: 4,
    [ConstantsLib.PRIORITY_OUT_OF_SLA]: 15,
    [ConstantsLib.SUPER_PRIORITY_IN_SLA]: 0,
    [ConstantsLib.SUPER_PRIORITY_OUT_OF_SLA]: 7,
  };

  // Fixed biometrics dates used by the source page object
  static readonly DATE_IN_SLA = { day: '20', month: '12', year: '2025' } as const;
  static readonly DATE_OUT_OF_SLA = { day: '20', month: '10', year: '2025' } as const;
  static readonly DATE_IN_SLA_P = { day: '16', month: '02', year: '2026' } as const;
  static readonly DATE_OUT_OF_SLA_P = { day: '10', month: '02', year: '2026' } as const;
  static readonly DATE_IN_SLA_SP = { day: '19', month: '02', year: '2026' } as const;
  static readonly DATE_OUT_OF_SLA_SP = { day: '17', month: '02', year: '2026' } as const;
  static readonly BANK_HOLIDAYS_URL = 'https://www.gov.uk/bank-holidays.json';
}
