'use strict';

var expressLoader = require('./express-loader');
var config = require('config');
var LoggerFactory = require('./logger-factory');
var pkg = require('./package.json');
var loggerFactory = new LoggerFactory(config);
var servicesLoader = require('./services/');
var clientConfig = require('./client-config');

function Flash() {
  this.config = {};
  this.services = {};
}

Flash.prototype.init = function() {
  this.config = config;
  //load services
  this.services = servicesLoader(this.config);

  clientConfig.data = {
    siteTitle: config.get('siteTitle'),
    siteDescription: config.get('siteDescription')
  };
};

Flash.prototype.logger = loggerFactory.create('flash');

Flash.prototype.getLogger = loggerFactory.create.bind(loggerFactory);

Flash.prototype.run = function(callback) {
  var expressApp = expressLoader();
  var params = {
    config: this.config,
    loggerFactory: loggerFactory,
    version: pkg.version
  };
  expressApp.listen(flash.config.get('port'), flash.config.get('ip'), function() {
    callback({
      version: params.version,
      port: flash.config.get('port'),
    });
  });

};

var flash = new Flash();
flash.init();
module.exports = flash;
