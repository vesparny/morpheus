var bunyan = require('bunyan'),

  bformat = require('bunyan-format'),
  formatOut = bformat({
    outputMode: 'long'
  }),

  path = require("path"),
  _ = require('lodash');


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
  console.log(config);
  this.config = config;
  this.rootBunyanLogger = null;
  this.cache = {};
  this.defaultConfig = {
    level: "info",
    name: "poseidon",
    streams: [{
      level: this.config.get("log").level || "info",
      stream: formatOut
    }, {
      level: this.config.get("log").level || "info",
      type: 'rotating-file',
      path: path.join(this.config.get("appRoot"), this.config.get("log").file),
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
