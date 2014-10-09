var domain = require('domain');
var _ = require('lodash');
var server = require('./server');
var utils = require('./utils');
var Config = require("./config");
var LoggerFactory = require("./logger-factory");

function App() {
  var self = this;
  self.config = new Config(utils.detectEnvironment());
  self.loggerFactory = new LoggerFactory(self.config);
  self.logger = self.loggerFactory.create();
}


App.prototype.run = function(callback) {
  var self = this;
  var appDomain = domain.create();
  // wrap in top-level domain, otherwise we sometimes don't get uncaught
  // exceptions printed in node 0.10.x
  appDomain.run(function() {
    throw error;
    process.nextTick(function(){
    setTimeout (function(){
      // simulating some various async stuff
      fs.open("non-existent file", "r", function(error, fd) {
        if (error) throw error;
      });
    }, 10);
  });
  });
  appDomain.on('error', function(err) {
    console.log("ciaoooo");
    process.exit(1);
  });
};


module.exports = function() {
  return new App();
};
