'use strict';

var React = require('react');
var ContentActions = require('../../shared/actions/ContentActions');
var serverUtils = require('../../server/utils');
var validator = require('validator');

module.exports = function(server) {
  server.get('/', function(req, res, next) {
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(ContentActions.list, {
      page: '1'
    }, function(err) {
      if (err) {
        return next(err);
      }
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      res.expose(fluxibleApp.dehydrate(context), 'Morpheus');
      serverUtils.render(res, markup);
    });
  });

  server.get('/page/:page', function(req, res, next) {
    console.log("type", typeof req.params.page);
    var page = req.params.page || '0';
    if (!validator.isInt(page)) {
      return next();
    }
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(ContentActions.list, {
      page: page
    }, function(err) {
      if (err) {
        return next(err);
      }
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      res.expose(fluxibleApp.dehydrate(context), 'Morpheus');
      serverUtils.render(res, markup);
    });
  });

  server.get('/:slug', function(req, res, next) {
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(ContentActions.single, {
      slug: req.params.slug
    }, function(err) {
      if (err) {
        return next(err);
      }
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      res.expose(fluxibleApp.dehydrate(context), 'Morpheus');
      serverUtils.render(res, markup);
    });
  });

  server.get('/tag/:tag', function(req, res, next) {
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(ContentActions.tag, {
      tag: req.params.tag
    }, function(err) {
      if (err) {
        return next(err);
      }
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      res.expose(fluxibleApp.dehydrate(context), 'Morpheus');
      serverUtils.render(res, markup);
    });
  });
};
