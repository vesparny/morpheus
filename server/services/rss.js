'use strict';

var RSS = require('rss');
var config = require('../../shared/config');
var path = require('path');
var repositories = require(path.resolve(config.appRoot, 'server', config.repositoryStrategy.type))();
var serverUtils = require('../../server/utils');
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
      repositories.content.getPostsForFeed({
        contentPath: config.contentPath,
        permalinkStructure: config.permalinkStructure
      }).then(function(posts) {
        var promiseArray = [];
        var itemsArray = [];
        posts.forEach(function(post){
          var item = {
            title: post.title,
            guid: post.slug,
            url: config.siteUrl + post.permalink,
            date: post.rawDate.format(),
            categories: post.tags,
            author: post.author,
          };
          itemsArray.push(item);
          promiseArray.push(serverUtils.md2html(post.body));
        });
        Promise.all(promiseArray).then(function(data) {
          data.forEach(function(content, index){
            var currentItem = itemsArray[index];
            var htmlContent = cheerio.load(content, {decodeEntities: false});
            // convert relative resource urls to absolute
            ['href', 'src'].forEach(function (attributeName) {
              htmlContent('[' + attributeName + ']').each(function (index, el) {
                el = htmlContent(el);
                var attributeValue = el.attr(attributeName);
                attributeValue = url.resolve(config.siteUrl, attributeValue);
                el.attr(attributeName, attributeValue);
              });
            });
            currentItem.description = htmlContent.html();
            feed.item(currentItem);
          });
          resolve(feed);
        }).catch(function(err){
          reject(err);
        });
      }).catch(function(err){
        reject(err);
      });
    });
  }
};

module.exports = rssService;
