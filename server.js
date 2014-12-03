'use strict';

require('node-jsx').install();
var flash = require('./flash');
var context = require('./context');

flash.setContext(context);
flash.run(function(data) {
  flash.logger.info('Worker %s is running flash@%s on port %d', process.pid, data.version, data.port);
});
