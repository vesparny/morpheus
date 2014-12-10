'use strict';

require('node-jsx').install();
var expressLoader = require('./express-loader');
var pkg = require('./package.json');
var config = require('config');
var flash = require('./flash');

flash.init(config);

var expressApp = expressLoader();
var params = {
  config: flash.config,
  version: pkg.version
};
expressApp.listen(flash.config.get('port'), flash.config.get('ip'), function() {
  flash.logger().info('Worker %s is running flash@%s on port %d', process.pid, params.version, flash.config.get('port'));
});
