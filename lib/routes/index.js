var path = require('path');
var React = require('react');
var App = require('../../client/components/App');
var serviceLoader = require('../services');

function render(res, params) {
  var markup = React.renderToString(new App({
    data: params
  }));

  res.render('page', {
    markup: markup,
    data: JSON.stringify(params)
  });
}

module.exports = exports = function(app, config) {
  var services = serviceLoader(config);

  app.get('/', function(req, res, next) {
    services.post.getPosts().then(function(posts) {
      var params = {
        state: posts,
        route: 'home'
      };
      render(res, params);
    }).catch(function(err) {
      next(err);
    });
  });

  app.get('/:slug', function(req, res, next) {

    services.post.getPostBySlug(req.params.slug).then(function(single) {
      var params = {
        state: single,
        route: 'single',
        params: {
          slug: req.params.slug
        }
      };
      render(res, params);
    }).catch(function(err) {
      next(err);
    });

  });
};
