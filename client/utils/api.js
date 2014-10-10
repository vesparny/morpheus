var Promise = require('es6-promise').Promise;
var request = require('superagent');
var API_URL = '/api';
var TIMEOUT = 10000;

function get(url) {
  return new Promise(function(resolve, reject) {
    request.get(API_URL + url)
      .type('json')
      .timeout(TIMEOUT)
      .end(function(err, res) {
        if (err && err.timeout === TIMEOUT) {
          reject(err);
        } else if (res.status === 400) {
          reject(err);
        } else if (!res.ok) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}

var api = {
  get: get
};

module.exports = api;
