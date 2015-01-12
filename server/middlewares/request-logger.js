'use strict';

module.exports = function(log) {
  return function(req, res, next) {
    log.info([req.url, req.method, res.statusCode].join(' - '));
    return next();
  };
};
