'use strict';

var navigateAction = require('flux-router-component').navigateAction;

module.exports = function(appContext){
  return function(req, res, next) { // jshint ignore:line
    res.locals.fluxibleApp = appContext;
    var context = res.locals.context = appContext.createContext({
      req: req
    });

    if (req.path.indexOf('/api/') === 0) {
      return next();
    }
    context.getActionContext().executeAction(navigateAction, {
      url: req.url
    }, function(err) {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  };
};
