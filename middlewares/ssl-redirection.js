'use strict';

var flash = require('../flash');

module.exports = function(req, res, next) { // jshint ignore:line
  if (flash.config.useSSL) {
    if (req.headers['x-forwarded-proto'] === 'http') {
      return res.redirect(301, 'https://' + req.headers.host + req.path);
    } else {
      return next();
    }
  }
};
