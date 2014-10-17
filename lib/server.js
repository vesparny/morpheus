var express = require('express');
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

module.exports = function(apppp) {
  var app = express();
  var log = apppp.loggerFactory.create("server");
  log.info("creating express application");
  app.set('port', process.env.PORT || 3000);
  app.use(favicon(__dirname + '/../public/favicon.ico'));
  app.use(morganLogger('dev'));
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


  postRoute(app);
  indexRoute(app);

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
