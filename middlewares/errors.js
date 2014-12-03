'use strict';

var boom = require('boom');

module.exports = function(log) {
  return function(err, req, res, next) { // jshint ignore:line
    log.error({
      err: err,
      req: req
    }, 'There was an error while handling the request');
    var status = err.output && err.output.statusCode ? err.output.statusCode : err.status ? err.status : 500;
    boom.wrap(err, status);
    res.status(err.status);
    var view = err.output.statusCode === 404 ? '404' : '500';
    res.format({
      'html': function() {
        res.render(view, {
          err:err
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
