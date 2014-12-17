'use strict';

var expressLoader = require('./express-loader');
var config = require('./config');
var LoggerFactory = require('./logger-factory');
var pkg = require('./package.json');
var loggerFactory = new LoggerFactory(config);
var servicesLoader = require('./services/');
var clientConfig = require('./client-config');

function Morpheus() {
  this.config = {};
  this.services = {};
}

Morpheus.prototype.init = function() {
  this.config = config;
  //load services
  this.services = servicesLoader(this.config);

  clientConfig.data = {
    siteTitle: config.get('siteTitle'),
    siteDescription: config.get('siteDescription'),
    authors: config.get('authors')
  };
};

Morpheus.prototype.logger = loggerFactory.create('morpheus');

Morpheus.prototype.getLogger = loggerFactory.create.bind(loggerFactory);

Morpheus.prototype.run = function(callback) {
  var that = this;
  var expressApp = expressLoader();
  var params = {
    config: that.config,
    loggerFactory: loggerFactory,
    version: pkg.version
  };
  expressApp.listen(that.config.get('port'), that.config.get('ip'), function() {
    callback({
      version: params.version,
      port: that.config.get('port'),
    });
  });

};

var morpheus = new Morpheus();
morpheus.init();
module.exports = morpheus;
