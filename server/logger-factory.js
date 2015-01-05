'use strict';

var bunyan = require('bunyan');
var bformat = require('bunyan-format');
var formatOut = bformat({
  outputMode: 'long'
});

function Logger(bunyanLogger, config) {
  var self = this;
  this.bunyanLogger = bunyanLogger;
  this.config = config;

  ['fatal', 'error', 'warn', 'info', 'debug', 'trace'].
  forEach(function(level) {
    self[level] = function() {
      self.bunyanLogger[level].apply(self.bunyanLogger, arguments);
    };
  });
}

Logger.prototype.log = function(level) {
  this[level].apply(this, Array.prototype.slice.call(arguments, 1));
};


function LoggerFactory(config) {
  this.config = config;
  this.rootBunyanLogger = null;
  this.cache = {};
  this.defaultConfig = {
    level: 'info',
    name: 'app',
    streams: [{
      level: this.config.log.level || 'info',
      stream: formatOut
    }, {
      level: this.config.log.level || 'info',
      type: 'rotating-file',
      path: this.config.log.file,
      period: '1d',
      count: 3
    }],
    serializers: bunyan.stdSerializers
  };
  this.initialize();
}

LoggerFactory.prototype.initialize = function() {
  this.rootBunyanLogger = bunyan.createLogger(this.defaultConfig);
  this.cache.root = new Logger(this.rootBunyanLogger, this.config);
};

LoggerFactory.prototype.create = function(name) {
  if (!name) {
    return this.cache.root;
  }
  var currentLogger = this.cache.root;
  if (!this.cache[name]) {
    this.cache[name] = new Logger(currentLogger.bunyanLogger.child({
      component: name
    }));
    currentLogger = this.cache[name];
  }
  return currentLogger;
};

module.exports = LoggerFactory;
