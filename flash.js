'use strict';

var expressLoader = require('./express-loader');
var config = require('config');
var LoggerFactory = require('./logger-factory');
var pkg = require('./package.json');
var loggerFactory = new LoggerFactory(config);
var servicesLoader = require('./services/');

function Flash() {
  this.config = {};
  this.services = {};
  this.context = null;
}

Flash.prototype.init = function() {
  this.config = config;
  //load services
  this.services = servicesLoader(this.config);
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
  expressApp.listen(expressApp.get('port'), function() {
    callback({
      version: params.version,
      port: expressApp.get('port'),
    });
  });

};

Flash.prototype.setContext = function(context) {
  this.context = context;
};

//TODO plug here plugins, look at architect and fluxible-app for reference
Flash.prototype.plug = function(callback){
  //pass back only what needed, maybe the context
  callback(this);
};

var flash = new Flash();
flash.init();
module.exports = flash;
