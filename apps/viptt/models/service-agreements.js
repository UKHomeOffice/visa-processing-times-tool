'use strict';

const rawSLAData = require('../data/sla_data');

const INSIDE_UK = 'inside-uk';
const OUTSIDE_UK = 'outside-uk';
const SLA_DEFAULT = 'default';

/**
 * Service agreement data model
 * Contains data about the expected reply times for visa applications
 * according to the service level agreements.
 */
module.exports = class ServiceAgreements {
  /**
   * Load the SLA data
   * In future we may want to support having multiple different SLA versions
   * for example if the SLA data changes after a certain date.
   * @param {string} slaVersion
   * @returns {Object}
   */
  constructor(slaVersion = SLA_DEFAULT) {
    const slaData = JSON.parse(JSON.stringify(rawSLAData));
    this._serviceAgreementData = slaData[slaVersion];
  }

  /**
   * Return the SLA data according to the user's reason for applying
   * and whether they are inside or outside the UK
   * @param {string} reason
   * @param {boolean} insideUK
   * @returns {string | null}
   */
  getSLAData(reason, insideUK = true) {
    const ukStatus = insideUK ? INSIDE_UK : OUTSIDE_UK;
    return this._serviceAgreementData[ukStatus][reason] || null;
  }
};
