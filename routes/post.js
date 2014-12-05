'use strict';

var marked = require('marked');
var Promise = require('es6-promise').Promise; //jshint ignore:line
var serviceLoader = require('../services');

marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = function(server, config) {
  var services = serviceLoader(config);

  server.get('/api/posts/', function(req, res, next) {
    services.post.getPosts().then(function(articles) {
      res.json(articles);
    }).catch(function(err) {
      next(err);
    });
  });

  server.get('/api/posts/:slug/', function(req, res, next) {
    services.post.getPostBySlug(req.params.slug).then(function(article) {
      res.json(article);
    }).catch(function(err) {
      next(err);
    });
  });

  server.get('/api/tags/:tag/', function(req, res, next) {
    services.post.getTag(req.params.tag).then(function(pages) {
      res.json(pages);
    }).catch(function(err) {
      next(err);
    });
  });
};
