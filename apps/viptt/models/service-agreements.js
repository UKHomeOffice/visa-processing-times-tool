'use strict';

const rawSLAData = require('../data/sla_data');

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

  validateDatasetLoaded(data) {
    if (!data) {
      throw new Error('SLA Dataset not loaded');
    }
  }

  validateStringArg(value, name) {
    if (typeof value !== 'string') {
      throw new Error(`Invalid arguments: ${name} must be a string`);
    }
  }

  validatePositiveNumeric(value, fieldName, applicationType, applicationTypeOption) {
    const normalisedValue = typeof value === 'string' ? value.trim() : value;
    if (normalisedValue === null || normalisedValue === '') {
      throw new Error(`Invalid SLA entry for ${applicationType}.${applicationTypeOption}: missing ${fieldName}`);
    }
    const numericValue = Number(normalisedValue);
    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      throw new Error(
        `Invalid SLA entry for ${applicationType}.${applicationTypeOption}: invalid ${fieldName} '${value}'`
      );
    }
  }

  validateSLAFields(targetDuration, applicationType, applicationTypeOption) {
    this.validatePositiveNumeric(targetDuration.days, 'days', applicationType, applicationTypeOption);
    this.validatePositiveNumeric(targetDuration.weeks, 'weeks', applicationType, applicationTypeOption);
  }

  /**
   * Get the SLA options for a given application type.
   *
   * @param {Object} data - Full SLA dataset keyed by application type.
   * @param {string} applicationType - Application type key (e.g. `inside-uk`, `outside-uk`, `premium`).
   * @returns {Object} Options map for the application type.
   * @throws {Error} If the application type is missing or not an object.
   */
  getSLAOptionsByApplicationType(data, applicationType) {
    const slaOptions = data[applicationType];
    if (!slaOptions || typeof slaOptions !== 'object') {
      throw new Error(`Unknown SLA application type: ${applicationType}`);
    }
    return slaOptions;
  }

  /**
   * Get the target duration for a specific option within an application type.
   *
   * @param {Object} slaOptions - Options map returned by `getSLAOptionsByApplicationType`.
   * @param {string} applicationType - Application type key (used for error context).
   * @param {string} applicationTypeOption - Option key within the options map.
   * @returns {{weeks: string, days: string}} Target duration object.
   * @throws {Error} If the option is missing or not an object.
   */
  getSLATargetDuration(slaOptions, applicationType, applicationTypeOption) {
    const targetDuration = slaOptions[applicationTypeOption];
    if (!targetDuration || typeof targetDuration !== 'object') {
      throw new Error(`Unknown SLA option: ${applicationTypeOption} for application type ${applicationType}`);
    }
    return targetDuration;
  }

  /**
   * Get the SLA target duration for a given application type and option.
   *
   * Validates the dataset and arguments, resolves the application type (e.g. `inside-uk`,
   * `outside-uk`, `premium`), then retrieves and validates the target duration (weeks/days)
   * for the specified option.
   *
   * @param {string} applicationType - Application type key (e.g. `inside-uk`, `outside-uk`, `premium`).
   * @param {string} applicationTypeOption - Option within the application type (e.g. a reason or `premium-priority`).
   * @returns {{weeks: string, days: string}} Validated target duration.
   * @throws {Error} If the dataset is missing, arguments are invalid,
   * the application type or option is unknown,
   * or `weeks`/`days` are not valid positive numbers.
   */
  getSLAData(applicationType, applicationTypeOption) {
    const data = this._serviceAgreementData;
    this.validateDatasetLoaded(data);
    this.validateStringArg(applicationType, 'applicationType');
    this.validateStringArg(applicationTypeOption, 'applicationTypeOption');
    const slaOptions = this.getSLAOptionsByApplicationType(data, applicationType);
    const targetDuration = this.getSLATargetDuration(slaOptions, applicationType, applicationTypeOption);
    this.validateSLAFields(targetDuration, applicationType, applicationTypeOption);
    return targetDuration;
  }
};
