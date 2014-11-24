'use strict';

var downsize = require('downsize');

var utils = module.exports = exports = {};

utils.detectEnvironment = function() {
  return process.env.NODE_ENV || "development";
};

utils.excerpt = function(md) {
  var res;
  res = md.replace(/<\/?[^>]+>/gi, '');
  res = res.replace(/(\r\n|\n|\r)+/gm, ' ');
  return downsize(res, {
    "words": 50
  });
};
