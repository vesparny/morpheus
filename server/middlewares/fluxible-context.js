'use strict';

module.exports = function(appContext){
  return function(req, res, next) { // jshint ignore:line
    res.locals.fluxibleApp = appContext;
    res.locals.context = appContext.createContext({
      req: req
    });
    next();
  };
};
