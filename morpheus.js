'use strict';

var expressLoader = require('./server/express-loader');
var LoggerFactory = require('./server/logger-factory');
var pkg = require('./package.json');
var config = require('./shared/config');
var loggerFactory = new LoggerFactory(config);
var servicesLoader = require('./server/services/');

function Morpheus() {
  this.config = {};
  this.services = {};
}

Morpheus.prototype.init = function() {
  this.config = config;
  //load services
  this.services = servicesLoader(this.config);
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
  expressApp.listen(that.config.port, that.config.ip, function() {
    callback({
      version: params.version,
      port: that.config.port,
    });
  });
};

var morpheus = new Morpheus();
morpheus.init();
module.exports = morpheus;
