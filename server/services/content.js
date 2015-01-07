'use strict';

var Promise = require('es6-promise').Promise; //jshint ignore:line
var _s = require('underscore.string');
var marked = require('marked');
var serverUtils = require('../../server/utils');
var assign = require('object-assign');
var path = require('path');

function buildContent(item, siteUrl) {
  item.fullUrl = siteUrl + item.permalink;
  item.excerpt = serverUtils.excerpt(marked(item.body));
  item.content = marked(item.body);
  delete item.body;
  var tags = [];
  item.tags.forEach(function(tag) {
    tags.push({
      path: _s.slugify(tag),
      name: tag
    });
  });
  item.tags = tags;
  return item;
}

var actions = {
  single: function(repository, params, config, callback) {
    repository.findOne({
      slug: params.slug,
      siteUrl: config.siteUrl,
      contentPath: config.contentPath,
      permalinkStructure: config.permalinkStructure
    }).then(function(result) {
      var data = buildContent(result.rawData, config.siteUrl);
      delete result.rawData;
      result.data = data;
      callback(null, result);
    }).catch(function(err) {
      callback(err);
    });
  },
  list: function(repository, params, config, callback) {
    repository.find(assign(params, {
      postPerPage: config.postPerPage,
      contentPath: config.contentPath,
      permalinkStructure: config.permalinkStructure
    })).then(function(result) {
      var data = [];
      result.rawData.forEach(function(el) {
        var content = buildContent(el, config.siteUrl);
        data.push(content);
      });
      delete result.rawData;
      result.data = data;
      callback(null, result);
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
  var repositories = require(path.resolve(config.appRoot, 'server' ,config.repositoryStrategy.type))();
  return {
    name: 'content',
    read: function(req, resource, params, conf, callback) {
      actions[params.actionType](repositories.post, params || {}, config, callback);
    }
  };
};

module.exports = postService;
