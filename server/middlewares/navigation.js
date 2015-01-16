'use strict';

var navigateAction = require('flux-router-component').navigateAction;

module.exports = function(req, res, next) { // jshint ignore:line
  if (req.path.indexOf('/api/') === 0) {
    return next();
  }
  res.locals.context.getActionContext().executeAction(navigateAction, {
    url: req.url
  }, function(err) {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
};
