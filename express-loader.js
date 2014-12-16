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
  var routes = require('./routes');
  var errors = require('./middlewares/errors');
  var sslRedirection = require('./middlewares/ssl-redirection');
  var navigation = require('./middlewares/navigation');
  var notFound = require('./middlewares/not-found');
  var helmet = require('helmet');
  var appContext = require('./context');
  var flash = require('./flash');
  var server = express();
  var fetchrPlugin = appContext.getPlugin('FetchrPlugin');

  flash.logger.info('creating express application');
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

  fetchrPlugin.registerService(flash.services.content);
  server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

  server.use(sslRedirection);

  server.use(function(req, res, next) { // jshint ignore:line
    var context = res.locals.context = appContext.createContext({
      req: req
    });

    if (req.path.indexOf('/api/') === 0) {
      return next();
    }
    context.getActionContext().executeAction(navigateAction, {
      url: req.url
    }, function(err) {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  });

  routes(server);

  server.use(errors.call(errors, flash.getLogger('express-loader')));
  // Assume 404 since no middleware responded
  server.use(notFound.call(notFound, flash.getLogger('express-loader')));

  return server;
};
