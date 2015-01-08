'use strict';

var assign = require('object-assign');
var defaultConfig = require('../config/default');
var envConfig;
var path = require('path');
var pkg = require('../package.json');

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

function buildConfig(isNode) {
  var data = assign(defaultConfig, envConfig);
  data.env = process.env.NODE_ENV;
  data.version = pkg.version;
  if (isNode) {
    data.appRoot = process.cwd();
    data.log.file = path.resolve(data.appRoot, 'content/logs', data.log.file);
    data.contentPath = path.resolve(data.appRoot, 'content');
  }
  return data;
}

module.exports = buildConfig(typeof window === 'undefined');
