var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var marked = require("marked");
var fm = require("front-matter");
var Promise = require('es6-promise').Promise;
var downsize = require('downsize');
var glob = require("glob");
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

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

  return downsize(res, {"words": 50});
}

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/posts', function(req, res) {




  // options is optional

  glob(__dirname + '/content/posts/**/*.md', function(er, files) {
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
        res.json(articles);
      });
    });

  });
});

router.get('/posts/:slug', function(req, res) {
  glob(__dirname + '/content/posts/**/*'+req.params.slug+'.md', function(er, files) {
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

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);




// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
