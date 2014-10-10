var marked = require("marked");
var fm = require("front-matter");
var Promise = require('es6-promise').Promise;
var downsize = require('downsize');
var glob = require("glob");
var path = require('path');
var fs = require('fs');

function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, {
      encoding: "utf-8"
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(fm(data));
      }
    });

  });
}

function excerpt(md) {
  /*jslint regexp:true */
  var res;
  res = md.replace(/<\/?[^>]+>/gi, '');
  res = res.replace(/(\r\n|\n|\r)+/gm, ' ');
  /*jslint regexp:false */

  return downsize(res, {
    "words": 50
  });
}



var postService = module.exports = exports = {
  getPosts: function(params) {
    params = params || {};
    return new Promise(function(resolve, reject) {
      glob(path.resolve(__dirname + '/../../content/posts/**/*.md'), function(err, files) {
        var promiseArray = [];
        files.forEach(function(file) {
          promiseArray.push(readFile(file));
        });
        Promise.all(promiseArray).then(function(data) {
          var articles = [];
          data.forEach(function(single) {
            var article = {};
            article.author = single.attributes.author;
            article.tags = single.attributes.tags;
            article.date = single.attributes.date;
            article.slug = single.attributes.slug;
            article.title = single.attributes.title;
            article.excerpt = excerpt(marked(single.body));
            articles.push(article);
          });
          resolve(articles);
        }).catch(function(error) {
          reject(new Error(error));
        });
      });
    });
  },

  getPostBySlug: function(slug) {
    return new Promise(function(resolve, reject) {
      glob(path.resolve(__dirname + '/../../content/posts/**/*' + slug + '.md'), function(err, files) {
        var promiseArray = [];
        files.forEach(function(file) {
          promiseArray.push(readFile(file));
        });
        Promise.all(promiseArray).then(function(data) {
          var articles = [];
          data.forEach(function(single) {
            var article = {};
            article.author = single.attributes.author;
            article.tags = single.attributes.tags;
            article.slug = single.attributes.slug;
            article.date = single.attributes.date;
            article.title = single.attributes.title;
            article.content = marked(single.body);
            articles.push(article);
          });
          resolve(articles[0]);
        }).catch(function(error) {
          reject(new Error(error));
        });
      });
    });
  }
};
