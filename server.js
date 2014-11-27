'use strict';

require('node-jsx').install();
var boogie = require('./boogie');
boogie.run(function(data) {
  boogie.logger.info('Worker %s is running app@%s on port %d', process.pid, data.version, data.port);
});
