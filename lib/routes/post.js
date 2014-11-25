'use strict';

var marked = require('marked');
var Promise = require('es6-promise').Promise; //jshint ignore:line
var serviceLoader = require('../services');

marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = exports = function(app, config) {

  var services = serviceLoader(config);

  app.get('/api/posts/', function(req, res, next) {
    services.post.getPosts().then(function(articles) {
      res.json(articles);
    }).catch(function(err) {
      next(err);
    });
  });

  app.get('/api/posts/:slug/', function(req, res, next) {
    services.post.getPostBySlug(req.params.slug).then(function(article) {
      res.json(article);
    }).catch(function(err) {
      next(err);
    });
  });
};
