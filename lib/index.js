var domain = require('domain');
var _ = require('lodash');
var server = require('./server');
var utils = require('./utils');
var Config = require("./config");
var LoggerFactory = require("./logger-factory");
var pkg = require('../package.json');

function App() {
  var self = this;
  self.config = new Config(utils.detectEnvironment());
  self.loggerFactory = new LoggerFactory(self.config);
  self.logger = self.loggerFactory.create();
  self.version = pkg.version;
}

App.prototype.run = function(callback) {
  var express = server(this);
  express.listen(express.get('port'), function(){
    callback(express);
  });
};

module.exports = new App();
