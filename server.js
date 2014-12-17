'use strict';

require('node-jsx').install();
var morpheus = require('./morpheus');

morpheus.run(function(data) {
  morpheus.logger.info('Worker %s is running morpheus@%s on port %d', process.pid, data.version, data.port);
});
