'use strict';

var _ = require('lodash');
var data = null;
var env = 'development';
var defaultConfig  = require('./config/default');
var envConfig  = require('./config/development');

function Config() {
  this.load();
}

Config.prototype.load = function() {
  try {
    data = _.merge(defaultConfig, envConfig);
    data.env = env;
  } catch (err) {
    throw new Error('Failed to laod configuration. Caused by: \n' + err.stack);
  }
};


Config.prototype.get = function(key) {
  return key ? data[key] : undefined;
};

var config = new Config();
module.exports = config;
