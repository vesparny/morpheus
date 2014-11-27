'use strict';

var server = require('./server');
var client = require('./client');
var api = require('./api');


module.exports = {
  client: client,
  server: server,
  api: api
};
