'use strict';

var AbstractRepository = require('../abstract-repository');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var fm = require('front-matter');
var inherits = require('inherits');
var moment = require('moment');
var _s = require('underscore.string');
var errors = require('../errors');

function readFile(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, {
      encoding: 'utf-8'
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        var parsed = fm(data);
        parsed.attributes.tags = parsed.attributes.tags ? parsed.attributes.tags.split(',') : [];
        var tags = [];
        parsed.attributes.tags.forEach(function(tag) {
          tags.push({
            path: _s.slugify(tag),
            name: tag
          });
        });
        parsed.attributes.tags = tags;
        var filename = path.basename(file);
        var date = moment(filename.substring(0, 10), 'YYYY-MM-DD');
        parsed.attributes.date = date.format('DD MMMM YYYY');
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
    glob(path.resolve(__dirname + '/../content/posts/**/*.md'), function(err, files) {
      if (err) {
        reject(new errors.InternalServer());
      }
      if (files.length === 0) {
        reject(new errors.NotFound());
      } else {
        var promiseArray = [];
        files.forEach(function(file) {
          promiseArray.push(readFile(file));
        });
        Promise.all(promiseArray).then(function(data) {
          //sorting
          data.sort(function(a, b) {
            return b.attributes.date > a.attributes.date;
          });
          resolve(data);
        }).catch(function(err) {
          reject(new errors.InternalServer(err.message));
        });
      }

    });
  });
};

PostRepository.prototype.findOne = function(options) {
  options = options || {};
  var that = this;
  return new Promise(function(resolve, reject) {
    glob(path.resolve(__dirname + '/../content/posts/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-' + options.slug + '.md'), function(err, files) {
      if (err) {
        reject(new errors.InternalServer());
      }
      if (files.length === 0) {
        that.findPage(options).then(function(data) {
          resolve(data);
        }).catch(function(err) {
          reject(err);
        });
      } else {
        readFile(files[0]).then(function(data) {
          resolve(data);
        }).catch(function(err) {
          reject(new errors.InternalServer(err.message));
        });
      }
    });
  });
};

PostRepository.prototype.findPage = function(options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    glob(path.resolve(__dirname + '/../content/pages/' + options.slug + '.md'), function(err, files) {
      if (err) {
        reject(new errors.InternalServer(err.message));
      }
      if (files.length === 0) {
        reject(new errors.NotFound());
      } else {
        readFile(files[0]).then(function(data) {
          resolve(data);
        }).catch(function(err) {
          reject(new errors.InternalServer(err.message));
        });
      }
    });
  });
};

PostRepository.prototype.findTag = function(options) {
  var tag = options.tag;
  return Promise.resolve(tag);
};


module.exports = PostRepository;
