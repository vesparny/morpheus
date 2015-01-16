'use strict';

module.exports = function(req, res, next) { // jshint ignore:line
  if (req.path.indexOf('/api/') === 0) {
    return next();
  }
  if (/[A-Z]/.test(req.path)) {
    res.redirect(301, req.url.replace(req.path, req.path.toLowerCase()));
  } else {
    next();
  }
};
