var marked = require('marked');
var fm = require('front-matter');
var Promise = require('es6-promise').Promise;
var downsize = require('downsize');
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var services = require('../services');
marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = exports = function(app) {

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
