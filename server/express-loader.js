'use strict';

module.exports = function() {
  var express = require('express');
  var slashes = require('connect-slashes');
  var path = require('path');
  var bodyParser = require('body-parser');
  var favicon = require('serve-favicon');
  var methodOverride = require('method-override');
  var multer = require('multer');
  var routes = require('./routes');
  var errors = require('./middlewares/errors');
  var sslRedirection = require('./middlewares/ssl-redirection');
  var sanitize = require('./middlewares/sanitize');
  var requestLogger = require('./middlewares/request-logger');
  var robotstxt = require('./middlewares/robots');
  var notFound = require('./middlewares/not-found');
  var helmet = require('helmet');
  var morpheus = require('../morpheus');
  var server = express();

  morpheus.logger.info('creating express application');
  server.enable('strict routing');
  server.use(requestLogger.call(null, morpheus.getLogger('express-loader')));
  server.use(robotstxt);
  server.use(methodOverride());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));
  server.use(multer());
  server.use('/content/images', express.static(path.join(morpheus.config.appRoot, '/content/images/')));
  server.use('/dist', express.static(path.join(morpheus.config.appRoot, '/dist')));
  server.use(favicon(path.join(morpheus.config.appRoot, 'content/favicon.ico')));
  server.use(express.static(path.join(morpheus.config.appRoot, '/content/themes/', morpheus.config.theme)));

  // Use helmet to secure Express headers
  server.use(helmet.xframe());
  server.use(helmet.xssFilter());
  server.use(helmet.nosniff());
  server.use(helmet.ienoopen());

  // powered by Morpheus
  server.use(helmet.hidePoweredBy());

  server.use(sslRedirection);

  server.use(sanitize);

  server.use(slashes());

  server.use(sslRedirection);

  routes(server);

  server.use(errors.call(null, morpheus.getLogger('express-loader')));
  // Assume 404 since no middleware responded
  server.use(notFound.call(null, morpheus.getLogger('express-loader')));
  return server;
};
