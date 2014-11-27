'use strict';

var express = require('express');
var expressState = require('express-state');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var morganLogger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var indexRoute = require('./routes');
var postRoute = require('./routes/post');
var errors = require('./middlewares/errors');
var appContext = require('./context');
var navigateAction = require('flux-router-component').navigateAction;
var services = require('./services');

module.exports = function(params) {
  appContext.plug({
    name: 'ServicePlugin',
    plugContext: function plugContext() {
      return {
        plugActionContext: function plugActionContext(actionContext) {
          actionContext.services = services(params.config);
        }
      };
    }
  });
  var server = express();
  expressState.extend(server);
  server.set('state namespace', 'App');
  var log = params.loggerFactory.create('server');
  log.info('creating express application');
  server.set('port', process.env.PORT || 3000);
  server.use(favicon(__dirname + '/public/favicon.ico'));
  server.use(morganLogger('dev'));
  server.use(methodOverride());
  server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
  }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use(multer());
  server.use(express.static(path.join(__dirname, '/public')));

  server.use(function(req, res, next) {
    var context = res.locals.context = appContext.createContext();
    if (req.path.indexOf('/api/') === 0) {
      return next();
    }
    context.getActionContext().executeAction(navigateAction, {
      path: req.path
    }, function(err) {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  });

  indexRoute(server, params.config, appContext);
  postRoute(server, params.config, appContext);


  server.use(errors.call(errors, log));

  // Assume 404 since no middleware responded
  server.use(function(req, res) {
    res.status = 404;
    res.format({
      html: function() {
        res.render('404', {
          url: req.url
        });
      },
      json: function() {
        res.send({
          error: 'Not found'
        });
      },
      'default': function() {
        res.send();
      }
    });
  });
  return server;
};
