'use strict';

module.exports = function() {
  var express = require('express');
  var slashes = require('connect-slashes');
  var path = require('path');
  var bodyParser = require('body-parser');
  var favicon = require('serve-favicon');
  var morganLogger = require('morgan');
  var methodOverride = require('method-override');
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
  server.enable('strict routing');
  server.use(morganLogger('dev'));
  server.use(methodOverride());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use(multer());
  server.use('/content/images', express.static(path.join(morpheus.config.appRoot, '/content/images/')));
  server.use(favicon(path.join(morpheus.config.appRoot, 'content/favicon.ico')));
  server.use(express.static(path.join(morpheus.config.appRoot, '/content/themes/', morpheus.config.theme)));

  // Use helmet to secure Express headers
  server.use(helmet.xframe());
  server.use(helmet.xssFilter());
  server.use(helmet.nosniff());
  server.use(helmet.ienoopen());

  // powered by Morpheus
  server.use(helmet.hidePoweredBy({ setTo: 'Morpheus ' + morpheus.config.version }));

  fetchrPlugin.registerService(morpheus.services.content);
  server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

  server.use(slashes());

  server.use(sslRedirection);

  server.use(navigation.call(null, appContext));

  routes(server);

  server.use(errors.call(null, morpheus.getLogger('express-loader')));
  // Assume 404 since no middleware responded
  server.use(notFound.call(null, morpheus.getLogger('express-loader')));
  return server;
};
