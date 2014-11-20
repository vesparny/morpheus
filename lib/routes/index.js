var path = require('path');
var React = require('react');
var App = require('../../client/components/app.jsx');
var serviceLoader = require('../services');

module.exports = exports = function(app, config) {
  var services = serviceLoader(config);

  app.get('*', function(req, res) {
    services.post.getPosts().then(function(articles) {
      var markup = React.renderToString(new App({
        data: {
          articles: articles
        }
      }));
      res.render('page', {
        markup: markup,
        state: JSON.stringify(articles)
      });
    }).catch(function(err) {
      next(err);
    });
  });
};
