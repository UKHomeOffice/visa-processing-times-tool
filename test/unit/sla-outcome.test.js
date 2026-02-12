const SlaOutcome = require('../../apps/viptt/models/sla-outcome');

describe('SlaOutcome', () => {
  let slaOutcome;

  beforeEach(() => {
    slaOutcome = new SlaOutcome();
  });

  describe('getOutcomePath', () => {
    it('returns priority-outcome-inside for premium-priority and insideSLA true', () => {
      expect(slaOutcome.getOutcomePath('premium-priority', true)).toBe('priority-outcome-inside');
    });

    it('returns priority-outcome-outside for premium-priority and insideSLA false', () => {
      expect(slaOutcome.getOutcomePath('premium-priority', false)).toBe('priority-outcome-outside');
    });

    it('returns super-priority-outcome-inside for premium-super-priority and insideSLA true', () => {
      expect(slaOutcome.getOutcomePath('premium-super-priority', true)).toBe('super-priority-outcome-inside');
    });

    it('returns super-priority-outcome-outside for premium-super-priority and insideSLA false', () => {
      expect(slaOutcome.getOutcomePath('premium-super-priority', false)).toBe('super-priority-outcome-outside');
    });

    it('returns outcome-inside for premium-none and insideSLA true', () => {
      expect(slaOutcome.getOutcomePath('premium-none', true)).toBe('outcome-inside');
    });

    it('returns outcome-outside for premium-none and insideSLA false', () => {
      expect(slaOutcome.getOutcomePath('premium-none', false)).toBe('outcome-outside');
    });

    it('throws for undefined outcomeOption', () => {
      expect(() => slaOutcome.getOutcomePath(undefined, true))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
      expect(() => slaOutcome.getOutcomePath(undefined, false))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
    });

    it('throws for null outcomeOption', () => {
      expect(() => slaOutcome.getOutcomePath(null, true))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
      expect(() => slaOutcome.getOutcomePath(null, false))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
    });

    it('trims outcomeOption and resolves correctly', () => {
      expect(slaOutcome.getOutcomePath('  premium-priority  ', true)).toBe('priority-outcome-inside');
    });

    it('throws if insideSLA is not boolean', () => {
      expect(() => slaOutcome.getOutcomePath('premium-priority', 'yes'))
        .toThrow('Invalid argument: insideSLA must be a boolean');
      expect(() => slaOutcome.getOutcomePath('premium-priority', null))
        .toThrow('Invalid argument: insideSLA must be a boolean');
      expect(() => slaOutcome.getOutcomePath('premium-priority', undefined))
        .toThrow('Invalid argument: insideSLA must be a boolean');
    });

    it('throws if outcomeOption is not a string', () => {
      expect(() => slaOutcome.getOutcomePath(123, true))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
      expect(() => slaOutcome.getOutcomePath({}, true))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
      expect(() => slaOutcome.getOutcomePath([], true))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
    });

    it('throws if outcomeOption is an empty string', () => {
      expect(() => slaOutcome.getOutcomePath('', true))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
      expect(() => slaOutcome.getOutcomePath('   ', true))
        .toThrow('Invalid argument: outcomeOption must be a non-empty string');
    });

    it('returns outcome-inside for no premium option and insideSLA true', () => {
      expect(slaOutcome.getOutcomePath('some-other-option', true)).toBe('outcome-inside');
    });

    it('returns outcome-outside for no premium option and insideSLA false', () => {
      expect(slaOutcome.getOutcomePath('some-other-option', false)).toBe('outcome-outside');
    });
  });
});
