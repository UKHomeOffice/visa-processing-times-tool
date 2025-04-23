const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const jquery = require('jquery');
const _ = require('lodash');
let $;

const containsAll = (arr1, arr2) => arr2.every(i => arr1.includes(i));
const areOrderedEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);
const mapSections = obj => {
  const sections = Object.assign({}, obj);
  for (const section in sections) {
    if (sections.hasOwnProperty(section)) {
      sections[section] = _.map(sections[section], item => item.field || item);
    }
  }
  return sections;
};

const getUrl = function (app, url, expectedStatus) {
  return new Promise((resolve, reject) => {
    app
        .get(url)
        .expect(expectedStatus)
        .end((err, response) => err ? reject(err) : resolve(response));
  });
}

const postUrl = function (app, url, data, expectedStatus, token) {
  return new Promise((resolve, reject) => {
    app
        .post(url)
        .send(Object.assign(data, {
          'x-csrf-token': token
        }))
        .expect(expectedStatus)
        .end((err, response) => err ? reject(err) : resolve(response));
  });
}

const parseHtml = function (response) {
  const dom = new JSDOM(response.text);
  $ = jquery(dom.window);
  return Promise.resolve($(dom.window.document));
}


const getDom = function (response) {
  const dom = new JSDOM(response.text);
  return Promise.resolve(dom.window.document);
}

const getToken = function (response) {
  return parseHtml(response)
      .then(win => win.find('[name=x-csrf-token]').val());
}

const passStep = function (app, url, data) {
  return getUrl(app, url, 200)
      .then(getToken)
      .then(postUrl.bind(null, app, url, data, 302))
      .catch(error => Promise.reject(`Error passing step: ${url}. ${error}`));
}

const parse302 = function (previousResponse) {
  const url = previousResponse && previousResponse.text ? previousResponse.text.match(/\/(.*?)$/)[0] : null;
  if (!url || url.length > 100) {
    throw new Error('getRedirection or passRedirectionStep cannot find an url in the response');
  }
  return url;
}

const passRedirectionStep = function (app, data, previousResponse) {
  const url = parse302(previousResponse);
  return getUrl(app, url, 200)
      .then(getToken)
      .then(postUrl.bind(null, app, url, data, 302))
      .catch(error => Promise.reject(`Error passing step: ${url}. ${error}`));
}

const getRedirection = function (app, expectedStatus, previousResponse) {
  return getUrl(app, parse302(previousResponse), expectedStatus);
}

module.exports = {
  containsAll,
  areOrderedEqual,
  mapSections,
  getUrl,
  postUrl,
  passStep,
  passRedirectionStep,
  parseHtml,
  getDom,
  getToken,
  getRedirection
};
