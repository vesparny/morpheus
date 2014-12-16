'use strict';

var flash = require('../flash');

module.exports = function(req, res, next) {
  if (flash.config.useSSL) {
    if (req.headers['x-forwarded-proto'] === 'http') {
      return res.redirect(301, 'https://' + req.headers.host + req.path);
    } else {
      return next();
    }
  }else{
    return next();
  }
};
