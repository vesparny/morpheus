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
var actions = {
  single: function(repository, params, config, callback) {
    repository.findOne({
      slug: params.slug
    }).then(function(data) {
      callback(null, buildContent(data, config.get('siteUrl')));
    }).catch(function(err) {
      callback(err);
    });
  },
  list: function(repository, params, config, callback) {
    repository.find().then(function(data) {
      var articles = [];
      data.forEach(function(single) {
        articles.push(buildContent(single, config.get('siteUrl')));
      });
      callback(null, articles);
    }).catch(function(err) {
      callback(err);
    });
  },
  tag: function(repository, params, config, callback) {
    repository.findTag({
      tag: params.tag
    }).then(function(data) {
      callback(null, data);
    }).catch(function(err) {
      callback(err);
    });
  }
};

var postService = function(config) {
  var repositories = require(config.appRoot + '/' + config.get('repository-strategy.type'))();
  return {
    name: 'content',
    read: function(req, resource, params, conf, callback) {
      actions[params.actionType](repositories.post, params || {}, config, callback);
    }
  };
};

module.exports = postService;
