'use strict';

module.exports = function(){
  var express = require('express');
  var expressState = require('express-state');
  var path = require('path');
  var bodyParser = require('body-parser');
  var favicon = require('serve-favicon');
  var morganLogger = require('morgan');
  var methodOverride = require('method-override');
  var session = require('express-session');
  var multer = require('multer');
  var indexRoute = require('./routes');
  var postRoute = require('./routes/post');
  var errors = require('./middlewares/errors');
  var navigateAction = require('flux-router-component').navigateAction;
  var flash = require('./flash');


  var server = express();
  flash.logger.info('creating express application');
  expressState.extend(server);
  server.set('state namespace', 'App');
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
    var context = res.locals.context = flash.context.createContext();
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

  indexRoute(server, flash.config, flash.context);
  postRoute(server, flash.config, flash.context);


  server.use(errors.call(errors, flash.getLogger('express-loader:ERROR')));

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
