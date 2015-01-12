'use strict';

var React = require('react');
var ContentActions = require('../../shared/actions/ContentActions');
var serverUtils = require('../../server/utils');
var validator = require('validator');
var config = require('../../shared/config');
var rssService = require('../services/rss');
var serialize = require('serialize-javascript');

module.exports = function(server) {

  function makeCall(req, res, next, options) {
    var context = res.locals.context;
    var fluxibleApp = res.locals.fluxibleApp;
    context.getActionContext().executeAction(options.action, options.params, function(err) {
      if (err) {
        return next(err);
      }
      res.locals.state = 'window.Morpheus=' + serialize(fluxibleApp.dehydrate(context)) + ';';
      var AppComponent = fluxibleApp.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext(),
        enableScroll: false
      }));
      serverUtils.render(res, markup);
    });
  }

  server.get('/', function(req, res, next) {
    makeCall(req, res, next, {
      action: ContentActions.list,
      params: {
        page: '1'
      }
    });
  });

  server.get('/rss/', function(req, res, next) {
    rssService.getFeed().then(function(feed) {
      res.set('Content-Type', 'text/xml; charset=UTF-8');
      res.send(feed.xml());
    }).catch(function(err) {
      return next(err);
    });
  });

  server.get('/page/:page/', function(req, res, next) {
    var page = req.params.page || '0';
    if (!validator.isInt(page)) {
      return next();
    }
    makeCall(req, res, next, {
      action: ContentActions.list,
      params: {
        page: page
      }
    });
  });

  server.get('/:title/', function(req, res, next) {
    makeCall(req, res, next, {
      action: ContentActions.single,
      params: {
        slug: req.params.title
      }
    });
  });

  server.get('/tag/:tag/', function(req, res, next) {
    makeCall(req, res, next, {
      action: ContentActions.tag,
      params: {
        slug: req.params.title
      }
    });
  });

  if (config.permalinkStructure !== '/:title/') {
    server.get(config.permalinkStructure, function(req, res, next) {
      makeCall(req, res, next, {
        action: ContentActions.single,
        params: {
          slug: req.params.title
        }
      });
    });

  }
};
