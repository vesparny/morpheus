var domain = require('domain');
var _ = require('lodash');
var server = require('./server');
var utils = require('./utils');
var config = require("config");
var LoggerFactory = require("./logger-factory");
var pkg = require('../package.json');
var loggerFactory = new LoggerFactory(config);

exports.run = function(callback) {
  var app = {
    config: config,
    loggerFactory: loggerFactory,
    version: pkg.version,
    services: null,
    repositories: null
  };

  var express = server(app);
  express.listen(express.get('port'), function() {
    callback({
      version : app.version,
      port: express.get('port'),
    });
  });
};
exports.logger = loggerFactory.create('index');
