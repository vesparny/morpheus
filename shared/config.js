'use strict';

var assign = require('object-assign');
var data = null;
var defaultConfig  = require('../config/default');
var envConfig;

//this if waterfall sucks, but it's needed for browserify
if (process.env.NODE_ENV === 'development') {
  envConfig = require('../config/development');
}

if (process.env.NODE_ENV === 'test') {
  envConfig = require('../config/test');
}

if (process.env.NODE_ENV === 'production') {
  envConfig = require('../config/production');
}

function Config() {
  this.load();
}

Config.prototype.load = function() {
  try {
    data = assign(defaultConfig, envConfig);
    data.env = process.env.NODE_ENV;
  } catch (err) {
    throw new Error('Failed to laod configuration. Caused by: \n' + err.stack);
  }
};


Config.prototype.get = function(key) {
  return key ? data[key] : undefined;
};

//this property is used only client-side
Config.prototype.client = {};

var config = new Config();

module.exports = config;
