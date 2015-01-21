'use strict';

var downsize = require('downsize');
var React = require('react');
var config = require('../shared/config');
var HtmlComponent = React.createFactory(require('../content/themes/'+ config.theme+ '/Html'));
var marked = require('marked');
var Promise = require('es6-promise').Promise; // jshint ignore:line

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
  },
  render: function(res, markup, state) {
    state = state || res.locals.state;
    var html = React.renderToStaticMarkup(HtmlComponent({ //jshint ignore:line
      state: state,
      markup: markup,
      context: res.locals.context.getComponentContext()
    }));
    res.set({
      'content-type': 'text/html; charset=utf-8'
    });
    res.write('<!DOCTYPE html>' + html);
    res.end();
  },
  md2html: function(md){
    return new Promise(function(resolve, reject) {
      marked(md, function (err, content) {
        if (err) {
          reject(err);
        }else{
          resolve(content);
        }
      });
    });
  }
};
