'use strict';

var util = require('util');
var serverUtils = require('../../server/utils');
var React = require('react');
var ContentActions = require('../../shared/actions/ContentActions');

module.exports = function(log) {
  return function(req, res) { // jshint ignore:line
    var message = util.format('page %s not found', req.protocol + '://' + req.get('host') + req.originalUrl);
    log.error('There was an error while handling the request, a page haven\'t been found: ' + message);
    res.status(404);
    res.format({
      'html': function() {
        var context = res.locals.context;
        var fluxibleApp = res.locals.fluxibleApp;
        context.getActionContext().executeAction(ContentActions.error, {
          err: {
            message: message,
            status: 404
          }
        }, function() {
          var AppComponent = fluxibleApp.getAppComponent();
          var markup = React.renderToString(AppComponent({ //jshint ignore:line
            context: context.getComponentContext(),
            enableScroll: false
          }));
          res.expose(fluxibleApp.dehydrate(context), 'App');
          serverUtils.render(res, markup);
        });
      },
      'json': function() {
        res.send({
          error: message
        });
      },
      'default': function() {
        res.send();
      }
    });
  };
};
