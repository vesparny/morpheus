'use strict';

var util = require('util');

function InternalError(message) {
  Error.call(this);
  this.stack = new Error().stack;
  this.message = message || 'internal server error';
  this.statusCode = 404;
}

util.inherits(InternalError, Error);

module.exports = InternalError;
