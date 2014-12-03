'use strict';

var marked = require('marked');
var Promise = require('es6-promise').Promise; //jshint ignore:line
var serverUtils = require('../utils').server;

var postService = function(config) {
  var repositories = require(config.appRoot + '/'+config.get('repository-strategy.type'))();
  return {
    getPosts: function(params) {
      params = params || {};
      return new Promise(function(resolve, reject) {
        repositories.post.find().then(function(data) {
          var articles = [];
          data.forEach(function(single) {
            var article = {};
            article.author = single.attributes.author;
            article.tags = single.attributes.tags;
            article.date = single.attributes.date;
            article.slug = single.attributes.slug;
            article.email = single.attributes.email;
            article.title = single.attributes.title;
            article.excerpt = serverUtils.excerpt(marked(single.body));
            articles.push(article);
          });
          resolve(articles);
        }).catch(function(err) {
          reject(err);
        });
      });
    },

    getPostBySlug: function(slug) {
      return new Promise(function(resolve, reject) {
        repositories.post.findOne({
          slug: slug
        }).then(function(single) {
          var article = {};
          article.author = single.attributes.author;
          article.tags = single.attributes.tags;
          article.slug = single.attributes.slug;
          article.date = single.attributes.date;
          article.title = single.attributes.title;
          article.email = single.attributes.email;
          article.content = marked(single.body);
          resolve(article);
        }).catch(function(err) {
          reject(err);
        });
      });
    }
  };
};

module.exports = postService;
