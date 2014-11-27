'use strict';

module.exports = function(log) {
  return function(err, req, res, next) { // jshint ignore:line
    console.log("arguments", err.output);
    log.error({
      err: err,
      req: req
    }, 'There was an error while handling the request');
    //res.status(err.output.statusCode || 500);
    res.format({
      html: function() {
        //var view = err.output.statusCode === 404 ? '404' : '500';
        res.send("view");
      },
      json: function() {
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
