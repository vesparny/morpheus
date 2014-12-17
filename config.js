'use strict';

var _ = require('lodash');
var path = require('path');
var data = null;

function loadConfigFile(configDir, fileName) {
  return require(path.resolve(configDir, fileName));
}

function Config() {
  this.load();
}

Config.prototype.load = function() {
  var defaultConfig = {};
  var envConfig = {};
  var configDir = path.resolve(process.cwd(), 'config');
  var defaultFileName = 'default';
  var env = process.env.NODE_ENV || 'development';

  try {
    defaultConfig = loadConfigFile(configDir, defaultFileName);
    envConfig = loadConfigFile(configDir, env);
    data = _.merge(defaultConfig, envConfig);
    this.env = env;
  } catch (err) {
    throw new Error('Failed to laod configuration. Caused by: \n' + err.stack);
  }
};


Config.prototype.get = function(key) {
  return key ? data[key] : undefined;
};

var config = new Config();
  module.exports = config;
