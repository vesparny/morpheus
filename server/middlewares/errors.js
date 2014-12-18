'use strict';

var util = require('util');
var serverUtils = require('../../server/utils');
var React = require('react');
var ContentActions = require('../../shared/actions/ContentActions');

module.exports = function(log) {
  return function(err, req, res, next) { // jshint ignore:line
    log.error({
      err: err.stack
    }, 'There was an error while handling the request');
    if (!err.statusCode) {
      err.statusCode = err.status ? err.status : 500;
    }
    if (err.statusCode === 404) {
      err.message = util.format('page %s not found', req.protocol + '://' + req.get('host') + req.originalUrl);
    }
    if (err.statusCode === 500) {
      err.message = err.message ? 'Internal Server Error - '+ err.message : 'Internal Server Error';
    }
    res.status(err.statusCode);
    res.format({
      'html': function() {
        var context = res.locals.context;
        var fluxibleApp = res.locals.fluxibleApp;
        context.getActionContext().executeAction(ContentActions.error, {
          err: {
            message: err.message,
            status: err.statusCode
          }
        }, function() {
          var AppComponent = fluxibleApp.getAppComponent();
          var markup = React.renderToString(AppComponent({ //jshint ignore:line
            context: context.getComponentContext()
          }));
          res.expose(fluxibleApp.dehydrate(context), 'App');
          serverUtils.render(res, markup);
        });
      },
      'json': function() {
        res.send({
          error: err.message || 'Unexpected error'
        });
      },
      'default': function() {
        res.send();
      }
    });
  };
};
