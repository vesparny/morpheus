'use strict';

var React = require('react');
var HtmlComponent = React.createFactory(require('../../client/components/Html'));
var appAction = require('../../client/actions/ApplicationAction');


module.exports = exports = function(server, config, app) {
  server.get('/', function(req, res, next) {
    var context = res.locals.context;
    context.getActionContext().executeAction(appAction, {}, function(err) {
      if (err) {
        if (err.status && err.status === 404) {
          next();
        } else {
          next(err);
        }
        return;
      }
      res.expose(app.dehydrate(context), 'App');
      var AppComponent = app.getAppComponent();
      var markup = React.renderToString(AppComponent({ //jshint ignore:line
        context: context.getComponentContext()
      }));
      var html = React.renderToStaticMarkup(HtmlComponent({ //jshint ignore:line
        state: res.locals.state,
        markup: markup
      }));
      res.set({
        'content-type': 'text/html; charset=utf-8'
      });
      res.write('<!doctype>' + html);
      res.end();
    });
  });

/*
    server.get('/:slug', function(req, res, next) {
      services.post.getPostBySlug(req.params.slug).then(function(single) {
        var params = {
          state: single,
          route: 'single',
          params: {
            slug: req.params.slug
          }
        };
        render(res, params);
      }).catch(function(err) {
        next(err);
      });
    });
    */
};
