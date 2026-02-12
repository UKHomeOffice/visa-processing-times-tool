'use strict';

const OUTCOME_PATHS = {
  'premium-priority': 'priority-outcome',
  'premium-super-priority': 'super-priority-outcome'
};

const INSIDE = 'inside';
const OUTSIDE = 'outside';

/**
 * Outcome route resolver for SLA results.
 */
module.exports = class SlaOutcome {
  /**
    * Resolve the outcome route segment based on premium selection and SLA status.
    *
    * Behavior:
    * - Premium selections `'premium-priority'` and `'premium-super-priority'` map
    *   to bases `priority-outcome` and `super-priority-outcome` respectively.
    * - Non-premium selections (e.g., `'premium-none'` or any unknown string) map to base `outcome`.
    * - Suffix is `inside` when `insideSLA === true`, otherwise `outside`.
    * - Returns a path segment without a leading slash; callers should prepend
    *   their base URL and ensure single-slash joining.
    *
    * Examples:
    * - getOutcomePath('premium-priority', true)  => 'priority-outcome-inside'
    * - getOutcomePath('premium-super-priority', false) => 'super-priority-outcome-outside'
    * - getOutcomePath('premium-none', false) => 'outcome-outside'
    *
    * @param {string} outcomeOption - Must be a non-empty primitive string;
    *  undefined/null or whitespace-only values are invalid.
    * @param {boolean} insideSLA - Whether the estimated reply date is within SLA.
    * @returns {string} Route path segment (no leading slash).
   */
  getOutcomePath(outcomeOption, insideSLA) {
    if (typeof insideSLA !== 'boolean') {
      throw new Error('Invalid argument: insideSLA must be a boolean');
    }
    if (typeof outcomeOption !== 'string' || outcomeOption.trim() === '') {
      throw new Error('Invalid argument: outcomeOption must be a non-empty string');
    }
    const opt = outcomeOption.trim();
    const base = OUTCOME_PATHS[opt] || 'outcome';
    const suffix = insideSLA ? INSIDE : OUTSIDE;
    return `${base}-${suffix}`;
  }
};
