'use strict';

var React = require('react');
var appAction = require('../actions/ApplicationAction');
var serverUtils = require('../utils').server;

module.exports = function(server) {
  server.get('/', function(req, res, next) {
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(appAction.home, {}, function(err) {
      if (err) {
        return next(err);
      }
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      res.expose(fluxibleApp.dehydrate(context), 'App');
      serverUtils.render(res, markup);
    });
  });

  server.get('/:slug', function(req, res, next) {
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(appAction.single, {
      slug: req.params.slug
    }, function(err) {
      if (err) {
        return next(err);
      }
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      res.expose(fluxibleApp.dehydrate(context), 'App');
      serverUtils.render(res, markup);
    });
  });

  server.get('/tag/:tag', function(req, res, next) {
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(appAction.tag, {
      tag: req.params.tag
    }, function(err) {
      if (err) {
        return next(err);
      }
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      res.expose(fluxibleApp.dehydrate(context), 'App');
      serverUtils.render(res, markup);
    });
  });
};
