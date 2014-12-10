'use strict';

module.exports = function() {
  var express = require('express');
  var expressState = require('express-state');
  var path = require('path');
  var bodyParser = require('body-parser');
  var favicon = require('serve-favicon');
  var morganLogger = require('morgan');
  var methodOverride = require('method-override');
  var session = require('express-session');
  var FSStore = require('connect-fs2')(session);
  var multer = require('multer');
  var indexRoute = require('./routes');
  var postRoute = require('./routes/post');
  var errors = require('./middlewares/errors');
  var navigateAction = require('flux-router-component').navigateAction;
  var helmet = require('helmet');
  var appContex = require('./context');
  var flash = require('./flash');
  var server = express();

  flash.logger().info('creating express application');
  expressState.extend(server);
  server.set('state namespace', 'App');
  server.use(favicon(__dirname + '/content/themes/blablabla/assets/favicon.ico'));
  server.use(morganLogger('dev'));
  server.use(methodOverride());
  server.use(session({
    store: new FSStore({
      dir: __dirname + '/content/sessions'
    }),
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8',
    cookie: {
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  }));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use(multer());
  server.use(express.static(path.join(__dirname, '/content/themes/blablabla')));

  // Use helmet to secure Express headers
  server.use(helmet.xframe());
  server.use(helmet.xssFilter());
  server.use(helmet.nosniff());
  server.use(helmet.ienoopen());
  server.disable('x-powered-by');

  server.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http') {
      return res.redirect(301, 'https://' + req.headers.host + '/');
    } else {
      return next();
    }
  });

  server.use(function(req, res, next) {
    res.locals.fluxibleApp = appContex;
    var context = res.locals.context = appContex.createContext();
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

  indexRoute(server, flash.config, appContex);
  postRoute(server, flash.config, appContex);

  server.use(errors.call(errors, flash.getLogger('express-loader:ERROR')));

  // Assume 404 since no middleware responded
  // no html handler needed since that case is managed by fluxible router
  server.use(function(req, res) {
    res.status = 404;
    res.format({
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
