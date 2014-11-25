var AbstractRepository = require('../abstract-repository');
var Promise = require('es6-promise').Promise;
var glob = require("glob");
var path = require('path');
var fs = require('fs');
var fm = require("front-matter");
var inherits = require('inherits');
var boom = require('boom');
var util = require('util');
var moment = require('moment');
var _s = require('underscore.string');

function readFile(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, {
      encoding: "utf-8"
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        var parsed = fm(data);
        parsed.attributes.tags = parsed.attributes.tags ? parsed.attributes.tags.split(','): [];
        var tags = [];
        parsed.attributes.tags.forEach(function(tag){
          tags.push({
            path : _s.slugify(tag),
            name: tag
          });
        });
        parsed.attributes.tags = tags;
        var filename =  path.basename(file);
        var date = moment(filename.substring(0,10), "YYYY-MM-DD");
        parsed.attributes.date = date.format("DD MMMM YYYY");
        resolve(parsed);
      }
    });
  });
}

function PostRepository() {
  AbstractRepository.call(this);
  this.name = 'post-repository';
}

inherits(PostRepository, AbstractRepository);

PostRepository.prototype.find = function(options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    glob(path.resolve(__dirname + '/../../content/posts/**/*.md'), function(err, files) {
      if (err) {
        reject(boom.wrap(error, 500));
      }
      if (files.length === 0) {
        reject(boom.notFound(util.format('page %s not found', options.slug)));
      } else {
        var promiseArray = [];
        files.forEach(function(file) {
          promiseArray.push(readFile(file));
        });
        Promise.all(promiseArray).then(function(data) {
          resolve(data);
        }).catch(function(error) {
          reject(new Error(error));
        });
      }

    });
  });
};

PostRepository.prototype.findOne = function(options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    glob(path.resolve(__dirname + '/../../content/posts/**/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-' + options.slug + '.md'), function(err, files) {
      if (err) {
        reject(boom.wrap(error, 500));
      }
      if (files.length === 0) {
        reject(boom.notFound(util.format('page %s not found', options.slug)));
      } else {
        readFile(files[0]).then(function(data) {
          resolve(data);
        }).catch(function(error) {
          reject(boom.wrap(error, 500));
        });
      }
    });
  });
};

module.exports = PostRepository;
