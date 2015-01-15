'use strict';

var Promise = require('es6-promise').Promise; //jshint ignore:line
var _s = require('underscore.string');
var serverUtils = require('../../server/utils');
var assign = require('object-assign');
var path = require('path');
var Promise = require('es6-promise').Promise; // jshint ignore:line

function buildContent(item, siteUrl) {
    return new Promise(function(resolve, reject) {
      var tags = [];
      item.tags.forEach(function(tag) {
        tags.push({
          path: _s.slugify(tag),
          name: tag
        });
      });
      item.tags = tags;
      item.fullUrl = siteUrl + item.permalink;
      serverUtils.toMarkdown(item.body).then(function(content){
        item.excerpt = serverUtils.excerpt(content);
        serverUtils.toMarkdown(item.body).then(function(bodyContent){
          item.content = bodyContent;
          delete item.body;
          resolve(item);
        });
      }).catch(function(err){
        reject(err);
      });
    });
}

var actions = {
  single: function(repository, params, config, callback) {
    repository.findOne({
      slug: params.slug,
      siteUrl: config.siteUrl,
      contentPath: config.contentPath,
      permalinkStructure: config.permalinkStructure
    }).then(function(result) {
      buildContent(result.content, config.siteUrl).then(function(content){
        delete result.content;
        result.data = content;
        callback(null, result);
      }).catch(function(err){
        callback(err);
      });
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
      var promiseArray = [];
      result.content.forEach(function(el) {
        promiseArray.push(buildContent(el, config.siteUrl));
      });
      Promise.all(promiseArray).then(function(data) {
        delete result.content;
        result.data = data;
        callback(null, result);
      }).catch(function(err){
        callback(err);
      });
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

var contentService = function(config) {
  var repositories = require(path.resolve(config.appRoot, 'server', config.repositoryStrategy.type))();
  return {
    name: 'content',
    read: function(req, resource, params, conf, callback) {
      actions[params.actionType](repositories.content, params || {}, config, callback);
    }
  };
};

module.exports = contentService;
