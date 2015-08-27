'use strict';
import { Router }          from 'react-router';
import Location            from 'react-router/lib/Location';
import { Provider }        from 'react-redux';
import configureStore from '../../store/configureStore';
import React from 'react';
var ContentActions = require('../../shared/actions/ContentActions');
var serverUtils = require('../../server/utils');
var validator = require('validator');
var config = require('../../shared/config');
var rssService = require('../services/rss');
var serialize = require('serialize-javascript');
import routesFactory from '../../createRoutes'

module.exports = function(server) {

  server.use((req, res) => {
    const location = new Location(req.path, req.query);
    const store = configureStore();
    const routes = routesFactory()

    Router.run(routes, location, (error, initialState, transition) => {
      const InitialView = (
          <Provider store={store}>
            {() =>
              <Router {...initialState} />
            }
          </Provider>
        );
        const component = React.renderToString(InitialView);
        serverUtils.render(res, component);
    });
  });

  server.get('/rss/', function(req, res, next) {
    rssService.getFeed().then(function(feed) {
      res.set('Content-Type', 'text/xml; charset=UTF-8');
      res.send(feed.xml());
    }).catch(function(err) {
      return next(err);
    });
  });
};
