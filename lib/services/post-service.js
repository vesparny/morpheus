var marked = require("marked");
var Promise = require('es6-promise').Promise;
var utils = require('../utils');

var postService = module.exports = exports = function(config) {
  var repositories = require(config.appRoot + '/lib/'+config.get('repository-strategy.type'))();
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
            article.title = single.attributes.title;
            article.excerpt = utils.excerpt(marked(single.body));
            articles.push(article);
          });
          resolve(articles);
        }).catch(function(error) {
          reject(new Error(error));
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
          article.content = marked(single.body);
          resolve(article);
        }).catch(function(error) {
          reject(new Error(error));
        });
      });
    }
  };
};
