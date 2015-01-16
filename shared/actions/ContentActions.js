'use strict';

var assign = require('object-assign');

function buildAppGlobalsPayload(config) {
  var debug = require('debug');
  if (config.debug) {
    debug.enable('*');
  } else {
    debug.disable();
  }
  return {
    siteTitle: config.siteTitle,
    siteUrl: config.siteUrl,
    siteDescription: config.siteDescription,
    authors: config.authors,
    googleAnalytics: config.googleAnalytics,
    disqusComments: config.disqusComments,
    version: config.version  
  };
}

module.exports = {
  list: function(context, payload, done) {
    context.dispatch('RESET_CONTENT_LIST');
    context.dispatch('SET_APP_GLOBALS', buildAppGlobalsPayload(context.config));
    context.service.read('content', {
      actionType: 'list',
      page: payload.page || '1'
    }, {}, function(err, result) {
      if (err) {
        context.dispatch('GET_CONTENT_LIST_FAILURE');
        return done(err);
      }
      context.dispatch('GET_CONTENT_LIST_SUCCESS', result.data);
      context.dispatch('SET_META', {
        description: context.config.siteDescription,
        title: context.config.siteTitle + (payload.page && payload.page !== '1' ? ' - Page ' + payload.page : ''),
        pagination: result.meta
      });
      done();
    });
  },
  single: function(context, payload, done) {
    context.dispatch('RESET_CONTENT');
    context.dispatch('RESET_CONTENT_LIST');
    context.dispatch('SET_APP_GLOBALS', buildAppGlobalsPayload(context.config));
    context.service.read('content', {
      slug: payload.slug,
      actionType: 'single'
    }, {}, function(err, result) {
      if (err) {
        context.dispatch('GET_CONTENT_FAILURE');
        return done(err);
      }
      context.dispatch('GET_CONTENT_SUCCESS', result.data);
      context.dispatch('SET_META', assign(result.data, {
        pagination: result.meta
      }));
      done();
    });
  },
  /*
  tag: function(context, payload, done) {
    context.service.read('content', {
      tag: payload.tag,
      actionType: 'tag'
    }, {}, function(err, single) {
      context.dispatch('GET_CONTENT_SUCCESS', single);
      context.dispatch('UPDATE_PAGE_TITLE', single.title);
      done();
    });
  },*/
  error: function(context, payload, done) {
    context.dispatch('SET_ERROR', payload.err);
    done();
  }
};
