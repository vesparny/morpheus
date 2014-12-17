'use strict';

require('node-jsx').install();
var morpheus = require('./morpheus');

morpheus.run(function(info) {
  morpheus.logger.info('Worker %s is running morpheus@%s on port %d', process.pid, info.version, info.port);
});
