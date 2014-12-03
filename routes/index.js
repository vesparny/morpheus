'use strict';

var React = require('react');
var appAction = require('../actions/ApplicationAction');

function render(req, res, app, context) {
  res.expose(app.dehydrate(context), 'App');
  var AppComponent = app.getAppComponent();
  var markup = React.renderToString(AppComponent({ //jshint ignore:line
    context: context.getComponentContext()
  }));
  res.render('html', {
    markup: markup,
    state: res.locals.state
  });
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
