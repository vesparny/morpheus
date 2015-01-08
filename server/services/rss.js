'use strict';

var RSS = require('rss');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var config = require('../../shared/config');
var path = require('path');
var repositories = require(path.resolve(config.appRoot, 'server', config.repositoryStrategy.type))();
var marked = require('marked');
var cheerio = require('cheerio');
var url = require('url');

var rssService = {
  getFeed: function() {
    var feed = new RSS({
      title: config.siteTitle,
      description: config.siteDescription,
      generator: 'Morpheus ' + config.version,
      feed_url: config.siteUrl + '/rss/', // jshint ignore:line
      site_url: config.siteUrl, // jshint ignore:line
      ttl: '60'
    });
    return new Promise(function(resolve, reject) {
      repositories.post.getPostsForFeed({
        contentPath: config.contentPath,
        permalinkStructure: config.permalinkStructure
      }).then(function(posts) {
        posts.forEach(function(post){
          var body = marked(post.body);
          var item = {
            title: post.title,
            guid: post.slug,
            url: config.siteUrl + post.permalink,
            date: post.rawDate.format(),
            categories: post.tags,
            author: post.author,
          };
          var htmlContent = cheerio.load(body, {decodeEntities: false});
          // convert relative resource urls to absolute
          ['href', 'src'].forEach(function (attributeName) {
            htmlContent('[' + attributeName + ']').each(function (index, el) {
              el = htmlContent(el);
              var attributeValue = el.attr(attributeName);
              attributeValue = url.resolve(config.siteUrl, attributeValue);
              el.attr(attributeName, attributeValue);
            });
          });
          item.description = htmlContent.html();
          feed.item(item);
        });
        resolve(feed);
      }).catch(function(err){
        reject(err);
      });
    });
  }
};

module.exports = rssService;
