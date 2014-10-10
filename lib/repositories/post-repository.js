var AbstractRepository = require('./abstract-repository');
var Promise = require('es6-promise').Promise;
var glob = require("glob");
var path = require('path');
var fs = require('fs');
var fm = require("front-matter");
var inherits = require('inherits');

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

function PostRepository() {
  AbstractRepository.call(this);
  this.name = 'post-repository';
}

inherits(PostRepository, AbstractRepository);

PostRepository.prototype.find = function(options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    glob(path.resolve(__dirname + '/../../content/posts/**/*.md'), function(err, files) {
      var promiseArray = [];
      files.forEach(function(file) {
        promiseArray.push(readFile(file));
      });
      Promise.all(promiseArray).then(function(data) {
        resolve(data);
      }).catch(function(error) {
        reject(new Error(error));
      });
    });
  });
};

PostRepository.prototype.findOne = function(options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    glob(path.resolve(__dirname + '/../../cotent/posts/**/*' + options.slug + '.md'), function(err, files) {
      readFile(files[0]).then(function(data) {
        resolve(data);
      }).catch(function(error) {
        reject(new Error(error));
      });
    });
  });
};

module.exports = PostRepository;
