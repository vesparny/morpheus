var Promise = require('bluebird');
var request = require('superagent');
var API_URL = '/api';
var TIMEOUT = 10000;

function get(url) {
  var deferred = Promise.defer();
  request
  .get(API_URL + url)
  .type('json')
  .timeout(TIMEOUT).end(function(err, res){
    if (err && err.timeout === TIMEOUT) {
      deferred.reject(err);
    } else if (res.status === 400) {
      deferred.reject(err);
    } else if (!res.ok) {
      deferred.reject(err);
    } else {
      deferred.resolve(res);

    }
  });

  return deferred.promise;
}

var api = {
  get:get
};

module.exports = api;
