# Visa Processing Times Tool (VIPTT)

## Description

Visa Processing Time's tool is a customer self serving form that calculates whether the visa applicant is within a decision response window or not (In SLA or not) and also a date is provided to the customer of when they will hear back from the Home Office. 

The application is built using [HOF (Home Office Forms) framework](https://github.com/UKHomeOfficeForms/hof)

Estimated response time for visa applications is calculated according to SLA, excluding non-working days (weekends and bank holidays).

Bank holiday data is fetched from the [Gov.UK Bank Holidays API](https://www.api.gov.uk/gds/bank-holidays/#bank-holidays).

Data will be written to a file, which is updated when the server is restarted, then the app will attempt to fetch the latest bank holiday data and update the file every 24 hours. It is also updated when the application is run locally, and then checked in to version control. This ensures there is an offline backup of this data.

SLA data is stored in JSON and checked in to version control. Currently, there is only one set of SLA data. However in the future we may need to support multiple versions of the SLA data.

## Install & Run the Application locally

### Prerequisites

- [Node.js](https://nodejs.org/en/) - v.20 LTS
- [Redis server](http://redis.io/download) running on default port 6379

### Setup

1. Create a `.env` file in the root directory and populate it with all the required environment variables for the project.
2. Install dependencies using the command `yarn`.
3. Start the service in development mode using `yarn run start:dev`.

### Testing

Tests are run using [Jest](https://jestjs.io/).

Run all tests:
```bash
yarn run test
```
Run unit tests:
```bash
yarn run test:unit
```
Run linting:
```bash
yarn run test:lint
```