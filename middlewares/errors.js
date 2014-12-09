'use strict';

var util = require('util');
var serverUtils = require('../utils').server;
var React = require('react');

module.exports = function(log) {
  return function(err, req, res, next) { // jshint ignore:line
    log.error({
      err: err.stack
    }, 'There was an error while handling the request');
    if (!err.statusCode) {
      err.statusCode = err.status ? err.status : 500;
    }
    if (err.statusCode === 404) {
      err.message = util.format('page %s not found', req.protocol + '://' + req.get('host') + req.originalUrl);
    }
    if (err.statusCode === 500) {
      err.message = err.message ? err.message : 'Internal Server Error';
    }
    res.status(err.statusCode);
    var viewComponent = err.statusCode === 404 ?
    React.createFactory(require('../content/themes/blablabla/404')):
    React.createFactory(require('../content/themes/blablabla/500'));
    res.format({
      'html': function() {
        var state = {
          err: req.url
        };
        var markup = React.renderToString(viewComponent(state));
        res.expose(state, 'App');
        serverUtils.render(res, markup);
      },
      'json': function() {
        res.send({
          error: err.message || 'Unexpected error'
        });
      },
      'default': function() {
        res.send();
      }
    });
  };
};
