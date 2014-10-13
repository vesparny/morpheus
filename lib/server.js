var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var indexRoute = require('./routes');
var postRoute = require('./routes/post');
var services = require('./services');

module.exports = function(nextInstance) {
  var repositoryStrategyType = nextInstance.config.get("repository-strategy").type;
  var log = nextInstance.loggerFactory.create("server");
  log.info("create express app");
  app.set('port', process.env.PORT || 3000);
  app.use(favicon(__dirname + '/../public/favicon.ico'));
  app.use(logger('dev'));
  app.use(methodOverride());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(multer());
  app.use(express.static(path.join(__dirname, '/../public')));


  postRoute(app, services.load(require("./"+repositoryStrategyType)));
  indexRoute(app, services);

  app.use(function(err, req, res, next) {
    if (!err) {
      return next();
    }
    log.error({
      err: err,
      req: req
    }, "There was an error while handling the request");
    var status = err.status || 500;
    res.status(status);
    res.json({
      message: "hey we got an error"
    });
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404);
    res.json({
      "error": "notFound"
    });
  });


  return app;
};
