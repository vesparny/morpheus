'use strict';

var util = require('util');

function NotFound(message) {
  Error.call(this);
  this.stack = new Error().stack;
  this.message = message || 'not found';
  this.statusCode = 404;
}

util.inherits(NotFound, Error);

module.exports = NotFound;
