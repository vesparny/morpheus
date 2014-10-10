var marked = require("marked");
var fm = require("front-matter");
var Promise = require('es6-promise').Promise;
var downsize = require('downsize');
var glob = require("glob");
var path = require('path');
var fs = require('fs');
marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = exports = function(app) {

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
    var res;
    res = md.replace(/<\/?[^>]+>/gi, '');
    res = res.replace(/(\r\n|\n|\r)+/gm, ' ');
    return downsize(res, {
      "words": 50
    });
  }

  app.get('/api/posts', function(req, res) {
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
        res.json(articles);
      });

    });
  });

  app.get('/api/posts/:slug', function(req, res) {
    glob(path.resolve(__dirname + '/../../content/posts/**/*' + req.params.slug + '.md'), function(err, files) {
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
        res.json(articles[0]);
      });

    });
  });
};
