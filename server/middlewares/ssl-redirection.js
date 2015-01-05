'use strict';

var morpheus = require('../../morpheus');

module.exports = function(req, res, next) {
  if (morpheus.config.useSSL) {
    if (req.headers['x-forwarded-proto'] === 'http') {
      return res.redirect(301, 'https://' + req.headers.host + req.path);
    } else {
      return next();
    }
  }else{
    return next();
  }
};
