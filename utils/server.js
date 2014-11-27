'use strict';

var downsize = require('downsize');

module.exports = {
  detectEnvironment: function() {
    return process.env.NODE_ENV || 'development';
  },
  excerpt: function(md) {
    var res;
    res = md.replace(/<\/?[^>]+>/gi, '');
    res = res.replace(/(\r\n|\n|\r)+/gm, ' ');
    return downsize(res, {
      'words': 50
    });
  }
};
