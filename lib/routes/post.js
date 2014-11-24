var marked = require('marked');
var fm = require('front-matter');
var Promise = require('es6-promise').Promise;
var downsize = require('downsize');
var glob = require('glob');
var path = require('path');
var serviceLoader = require('../services');
var fs = require('fs');
var nocache = require('../middlewares/nocache');
marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = exports = function(app, config) {

  var services = serviceLoader(config);

  app.get('/api/posts/', nocache, function(req, res, next) {
    services.post.getPosts().then(function(articles) {
      res.json(articles);
    }).catch(function(err) {
      next(err);
    });
  });

  app.get('/api/posts/:slug/',nocache, function(req, res, next) {
    services.post.getPostBySlug(req.params.slug).then(function(article) {
      res.json(article);
    }).catch(function(err) {
      next(err);
    });
  });
};
