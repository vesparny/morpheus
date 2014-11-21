var path = require('path');
var React = require('react');
var App = require('../../client/components/app.jsx');
var serviceLoader = require('../services');

module.exports = exports = function(app, config) {
  var services = serviceLoader(config);

  app.get('/', function(req, res) {
    services.post.getPosts().then(function(posts) {
      var markup = React.renderToString(new App({
        data: {
          state: posts,
          route: 'home',
          router: null
        }
      }));
      res.render('page', {
        markup: markup,
        data: JSON.stringify({
          state: posts,
          route: 'home',
          router: null
        })
      });
    }).catch(function(err) {
      next(err);
    });
  });

  app.get('/:slug', function(req, res) {

    services.post.getPostBySlug(req.params.slug).then(function(single) {
      var markup = React.renderToString(new App({
        data: {
          state: single,
          route: 'single',
          router: null,
          params:{
            slug:req.params.slug
          }
        }
      }));
      res.render('page', {
        markup: markup,
        data: JSON.stringify({
          state: single,
          route: 'single',
          router: null,
          params:{
            slug:req.params.slug
          }
        })
      });
    }).catch(function(err) {
      next(err);
    });

  });
};
