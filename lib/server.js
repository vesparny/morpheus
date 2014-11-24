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
var hbs = require('express-hbs');
var errors = require('./middlewares/errors');

module.exports = function(params) {
  var app = express();
  var log = params.loggerFactory.create("server");
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
  app.engine('hbs', hbs.express3({
    layoutsDir: __dirname + '/views/layouts'
  }));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  postRoute(app, params.config);
  indexRoute(app, params.config);

  app.use(errors.call(errors, log));

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404);
    res.json({
      "error": "notFound"
    });
  });


  return app;
};
