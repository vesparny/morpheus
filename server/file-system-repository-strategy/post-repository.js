'use strict';

var AbstractRepository = require('../abstract-repository');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var fm = require('front-matter');
var inherits = require('inherits');
var errors = require('../errors');
var moment = require('moment');

function buildContent(item) {
  var content = {};
  content.author = item.attributes.author;
  content.tags = item.attributes.tags;
  content.slug = item.attributes.slug;
  content.type = item.attributes.type;
  content.email = item.attributes.email;
  content.title = item.attributes.title;
  content.permalink = item.attributes.permalink;
  content.body = item.body || '';
  content.tags = item.attributes.tags ? item.attributes.tags.split(',') : [];
  if (item.attributes.type === 'post') {
    content.rawDate = item.attributes.rawDate;
    content.date = content.rawDate.format('DD MMMM YYYY');
  }
  return content;
}

function readFile(file) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, {
      encoding: 'utf-8'
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        var parsed = fm(data);
        var filename = path.basename(file);
        parsed.attributes.rawDate =  moment(filename.substring(0, 19), 'YYYY-MM-DD HHmmss');
        var content = buildContent(parsed);
        resolve(content);
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
  var response = {
    meta: {
      page: options.page,
      perPage: options.postPerPage,
      pageCount: 0,
      totalCount: 0
    },
    rawData: undefined
  };
  return new Promise(function(resolve, reject) {
    glob(path.resolve(options.contentPath, 'posts') + '/**/*.md', function(err, files) {
      if (err) {
        reject(new errors.InternalServer());
      }
      if (files.length === 0) {
        if (options.page === '1') {
          response.rawData = [];
          resolve(response);
        }else{
          reject(new errors.NotFound());
        }
      } else {
        response.meta.totalCount = files.length;
        response.meta.pageCount = Math.ceil(files.length / response.meta.perPage);
        files.sort(function(a, b){
          var filenameA = path.basename(a);
          var filenameB = path.basename(b);
          var dateA = moment(filenameA.substring(0, 19), 'YYYY-MM-DD HHmmss');
          var dateB = moment(filenameB.substring(0, 19), 'YYYY-MM-DD HHmmss');
          return dateB.unix() - dateA.unix();
        });
        var sliced = files.slice((response.meta.page - 1) * response.meta.perPage, response.meta.page * response.meta.perPage);
        if (sliced.length === 0) {
          reject(new errors.NotFound());
        }
        var promiseArray = [];
        sliced.forEach(function(file) {
          promiseArray.push(readFile(file));
        });

        Promise.all(promiseArray).then(function(data) {
          response.rawData = data;
          resolve(response);
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
  var response = {
    meta: {},
    rawData: undefined
  };
  return new Promise(function(resolve, reject) {
    glob(path.resolve(options.contentPath, 'posts') + '/*[0-9][0-9][0-9][0-9][0-9][0-9]-' + options.slug + '.md', function(err, files) {
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
          response.rawData = data;
          resolve(response);
        }).catch(function(err) {
          reject(new errors.InternalServer(err.message));
        });
      }
    });
  });
};

PostRepository.prototype.findPage = function(options) {
  options = options || {};
  var response = {
    meta: {},
    data: undefined
  };
  return new Promise(function(resolve, reject) {
    glob(path.resolve(options.contentPath, 'pages') + '/' + options.slug + '.md', function(err, files) {
      if (err) {
        reject(new errors.InternalServer(err.message));
      }
      if (files.length === 0) {
        reject(new errors.NotFound());
      } else {
        readFile(files[0]).then(function(data) {
          response.rawData = data;
          resolve(response);
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
