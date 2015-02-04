'use strict';

var assign = require('object-assign');
var defaultConfig = require('../config/default');
var env = process.env.NODE_ENV || 'development';
var envConfig = require('../config/' + env);
var path = require('path');
var pkg = require('../package.json');

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
