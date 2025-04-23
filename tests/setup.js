/* eslint no-process-env: 0 */

process.env.PORT = 9080;
process.env.NODE_ENV = 'test';
process.env.NOTIFY_KEY = 'UNIT_TEST';

const reqRes = require('hof').utils.reqres;

global.path = require('path');
global.config = require('../config');
global._ = require('lodash');
global.request = reqRes.req;
global.response = reqRes.res;
global.utils = require('./helpers/utilities');

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);