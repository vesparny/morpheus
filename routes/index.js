'use strict';

var React = require('react');
var HtmlComponent = React.createFactory(require('../components/Html'));
var appAction = require('../actions/ApplicationAction');

function render(req, res, app, context) {
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
}
module.exports = function(server, config, app) {
  server.get('/', function(req, res, next) {
    var context = res.locals.context;
    context.getActionContext().executeAction(appAction.home, {}, function(err) {
      if (err) {
        if (err.status && err.status === 404) {
          next();
        } else {
          next(err);
        }
        return;
      }
      render(req, res, app, context);
    });
  });

    server.get('/:slug', function(req, res, next) {
      var context = res.locals.context;
      context.getActionContext().executeAction(appAction.single, {slug:req.params.slug}, function(err) {
        if (err) {
          if (err.status && err.status === 404) {
            next();
          } else {
            next(err);
          }
          return;
        }
        render(req, res, app, context);
      });
    });
};
