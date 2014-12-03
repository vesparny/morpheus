'use strict';

var marked = require('marked');
var Promise = require('es6-promise').Promise; //jshint ignore:line
var serverUtils = require('../utils').server;


function buildContent(item, siteUrl) {
  var content = {};
  content.author = item.attributes.author;
  content.tags = item.attributes.tags;
  content.date = item.attributes.date;
  content.slug = item.attributes.slug;
  content.type = item.attributes.type;
  content.email = item.attributes.email;
  content.title = item.attributes.title;
  content.permalink = item.attributes.permalink;
  content.fullUrl = siteUrl + item.attributes.permalink;
  content.excerpt = serverUtils.excerpt(marked(item.body));
  content.content = marked(item.body);
  return content;
}
var postService = function(config) {
  var repositories = require(config.appRoot + '/' + config.get('repository-strategy.type'))();
  return {
    getPosts: function(params) {
      params = params || {};
      return new Promise(function(resolve, reject) {
        repositories.post.find().then(function(data) {
          var articles = [];
          data.forEach(function(single) {
            articles.push(buildContent(single, config.get('siteUrl')));
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
          var content = buildContent(single, config.get('siteUrl'));
          resolve(content);
        }).catch(function(err) {
          reject(err);
        });
      });
    }
  };
};

module.exports = postService;
