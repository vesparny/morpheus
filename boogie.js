'use strict';

var expressLoader = require('./express-loader');
var config = require('config');
var LoggerFactory = require('./logger-factory');
var pkg = require('./package.json');
var loggerFactory = new LoggerFactory(config);

exports.run = function(callback) {
  var params = {
    config: config,
    loggerFactory: loggerFactory,
    version: pkg.version
  };
  var expressApp = expressLoader(params);
  expressApp.listen(expressApp.get('port'), function() {
    callback({
      version: params.version,
      port: expressApp.get('port'),
    });
  });
};
exports.logger = loggerFactory.create('index');
