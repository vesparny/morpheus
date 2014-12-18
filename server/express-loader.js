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
  var appContext = require('../shared/context');
  var morpheus = require('../morpheus');
  var server = express();
  var fetchrPlugin = appContext.getPlugin('FetchrPlugin');

  morpheus.logger.info('creating express application');
  expressState.extend(server);
  server.set('state namespace', 'Morpheus');
  server.use(morganLogger('dev'));
  server.use(methodOverride());
  server.use(session({
    store: new FSStore({
      dir: path.join(morpheus.config.get('appRoot'), '/content/sessions')
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
  server.use('/content/images', express.static(path.join(morpheus.config.get('appRoot'), '/content/images/')));
  server.use(favicon(path.join(morpheus.config.get('appRoot'), 'content/favicon.ico')));
  server.use(express.static(path.join(morpheus.config.get('appRoot'), '/content/themes/', morpheus.config.get('theme'))));

  // Use helmet to secure Express headers
  server.use(helmet.xframe());
  server.use(helmet.xssFilter());
  server.use(helmet.nosniff());
  server.use(helmet.ienoopen());
  server.disable('x-powered-by');

  fetchrPlugin.registerService(morpheus.services.content);
  server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

  server.use(sslRedirection);

  server.use(navigation.call(null, appContext));

  routes(server);

  server.use(errors.call(null, morpheus.getLogger('express-loader')));
  // Assume 404 since no middleware responded
  server.use(notFound.call(null, morpheus.getLogger('express-loader')));
  return server;
};
