'use strict';

var LoggerFactory = require('./logger-factory');
var servicesLoader = require('./services/');
var loggerFactory = null;

function Flash() {
  this.config = {};
  this.services = {};
}

Flash.prototype.init = function(config) {
  this.config = config;
  //load services
  this.services = servicesLoader(this.config);
  loggerFactory = new LoggerFactory(config);
};

Flash.prototype.logger = function () {
  return loggerFactory.create('app');
};

Flash.prototype.getLogger = function () {
  return loggerFactory.create.bind(loggerFactory);
};

//TODO plug here plugins, look at architect and fluxible-app for reference
Flash.prototype.plug = function(callback){
  //pass back only what needed, maybe the context
  callback(this);
};

var flash = new Flash();
module.exports = flash;
