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
var assign = require('object-assign');

function buildContent(item, permalinkStructure) {
  var content = assign({}, item.attributes);
  content.permalink = '/' + content.slug + '/';

  //sanitize
  content.body = item.body || '';
  content.tags = content.tags ? content.tags.split(',') : [];
  if (content.type === 'post') {
    content.date = content.rawDate.format('DD MMMM YYYY');
    var availablePatterns = {
      year: 'YYYY',
      month: 'MM',
      day: 'DD'
    };
    var splitted = permalinkStructure.replace(/[\/]|[\/:]/g, ' ').split(' ');
    var pre = '';
    splitted.forEach(function(el) {
      if (availablePatterns[el]) {
        pre += content.rawDate.format(availablePatterns[el]) + '/';
      }
    });
    content.permalink = '/' + pre + item.attributes.slug + '/';
  }
  return content;
}

function readFile(file, permalinkStructure) {
  return new Promise(function(resolve, reject) {
    fs.readFile(file, {
      encoding: 'utf-8'
    }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        var parsed = fm(data);
        var filename = path.basename(file);
        parsed.attributes.rawDate = moment(filename.substring(0, 17), 'YYYY-MM-DD-HHmmss');
        var content = buildContent(parsed, permalinkStructure);
        resolve(content);
      }
    });
  });
}


function ContentRepository() {
  AbstractRepository.call(this);
  this.name = 'content-repository';
}

inherits(ContentRepository, AbstractRepository);

ContentRepository.prototype.find = function(options) {
  options = options || {};
  var response = {
    meta: {
      page: options.page,
      perPage: options.postPerPage,
      pageCount: 0,
      totalCount: 0
    },
    content: undefined
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
        } else {
          reject(new errors.NotFound());
        }
      } else {
        response.meta.totalCount = files.length;
        response.meta.pageCount = Math.ceil(files.length / response.meta.perPage);
        files.sort(function(a, b) {
          var filenameA = path.basename(a);
          var filenameB = path.basename(b);
          var dateA = moment(filenameA.substring(0, 17), 'YYYY-MM-DD-HHmmss');
          var dateB = moment(filenameB.substring(0, 17), 'YYYY-MM-DD-HHmmss');
          return dateB.unix() - dateA.unix();
        });
        var sliced = files.slice((response.meta.page - 1) * response.meta.perPage, response.meta.page * response.meta.perPage);
        if (sliced.length === 0) {
          reject(new errors.NotFound());
        }
        var promiseArray = [];
        sliced.forEach(function(file) {
          promiseArray.push(readFile(file, options.permalinkStructure));
        });

        Promise.all(promiseArray).then(function(data) {
          response.content = data;
          resolve(response);
        }).catch(function(err) {
          reject(new errors.InternalServer(err.message));
        });
      }

    });
  });
};

ContentRepository.prototype.getPostsForFeed = function(options) {
  options = options || {};
  return new Promise(function(resolve, reject) {
    glob(path.resolve(options.contentPath, 'posts') + '/**/*.md', function(err, files) {
      if (err) {
        reject(new errors.InternalServer());
      }
      files.sort(function(a, b) {
        var filenameA = path.basename(a);
        var filenameB = path.basename(b);
        var dateA = moment(filenameA.substring(0, 17), 'YYYY-MM-DD-HHmmss');
        var dateB = moment(filenameB.substring(0, 17), 'YYYY-MM-DD-HHmmss');
        return dateB.unix() - dateA.unix();
      });
      var sliced = files.slice(0, 10);
      var promiseArray = [];
      sliced.forEach(function(file) {
        promiseArray.push(readFile(file, options.permalinkStructure));
      });
      Promise.all(promiseArray).then(function(data) {
        resolve(data);
      }).catch(function(err) {
        reject(new errors.InternalServer(err.message));
      });
    });
  });
};

ContentRepository.prototype.findOne = function(options) {
  options = options || {};
  var that = this;
  var response = {
    meta: {},
    content: undefined
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
        readFile(files[0], options.permalinkStructure).then(function(data) {
          response.content = data;
          resolve(response);
        }).catch(function(err) {
          reject(new errors.InternalServer(err.message));
        });
      }
    });
  });
};

ContentRepository.prototype.findPage = function(options) {
  options = options || {};
  var response = {
    meta: {},
    content: undefined
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
          response.content = data;
          resolve(response);
        }).catch(function(err) {
          reject(new errors.InternalServer(err.message));
        });
      }
    });
  });
};

ContentRepository.prototype.findTag = function(options) {
  var tag = options.tag;
  return Promise.resolve(tag);
};


module.exports = ContentRepository;
