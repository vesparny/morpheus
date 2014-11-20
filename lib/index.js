var domain = require('domain');
var _ = require('lodash');
var server = require('./server');
var services = require('./services');
var utils = require('./utils');
var config = require("config");
var LoggerFactory = require("./logger-factory");
var pkg = require('../package.json');
var loggerFactory = new LoggerFactory(config);

exports.run = function(callback) {
  var params = {
    config: config,
    loggerFactory: loggerFactory,
    version: pkg.version
  };
  var express = server(params);
  express.listen(express.get('port'), function() {
    callback({
      version : params.version,
      port: express.get('port'),
    });
  });
};
exports.logger = loggerFactory.create('index');
