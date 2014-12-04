'use strict';

var util = require('util');

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
    var view = err.statusCode === 404 ? '404' : '500';
    res.format({
      'html': function() {
        res.render(view, {
          err: err
        });
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
