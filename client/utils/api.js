'use strict';

var Promise = require('es6-promise').Promise;
var request = require('superagent');
var apiUrl = '/api';
var timeout = 10000;

function get(url) {
  return new Promise(function(resolve, reject) {
    request.get(apiUrl + url)
      .type('json')
      .timeout(timeout)
      .end(function(err, res) {
        if (err) {
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
