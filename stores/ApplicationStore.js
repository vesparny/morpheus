'use strict';

var createStore = require('fluxible-app/utils/createStore');

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate',
    'SET_SITE_URL': 'setSiteUrl',
    'SET_ERROR': 'setError',
    'UPDATE_PAGE_TITLE': 'updatePageTitle',
    'UPDATE_META': 'updateMeta',
    'APP_START': 'appStart'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.route = {};
    this.siteUrl = null;
    this.pageTitle = '';
    this.siteTitle = '';
    this.siteDescription = '';
    this.error = null;
  },
  appStart: function(data) {
    this.siteTitle = data.siteTitle;
    this.siteDescription = data.siteDescription;
    this.emitChange();
  },
  updateMeta: function(meta) {
    this.page = meta.page;
    this.perPage = meta.perPage;
    this.pageCount = meta.pageCount;
    this.totalCount = meta.totalCount;
    this.emitChange();
  },
  updatePageTitle: function(title) {
    this.pageTitle = title;
    this.emitChange();
  },
  setError: function(error) {
    this.error = error;
    this.pageTitle = 'error';
    this.emitChange();
  },
  getPageTitle: function() {
    return this.pageTitle;
  },
  getSiteTitle: function() {
    return this.siteTitle;
  },
  getSiteDescription: function() {
    return this.siteDescription;
  },
  getSiteUrl: function() {
    return this.siteUrl;
  },
  setSiteUrl: function(url) {
    this.siteUrl = url;
    this.emitChange();
  },
  handleNavigate: function(route) {
    if (route.url === this.route.url) {
      return;
    }
    this.route = route;
    this.emit('change');
  },
  getCurrentPageName: function() {
    return this.currentPageName;
  },
  getState: function() {
    return {
      route: this.route,
      siteUrl: this.siteUrl,
      pageTitle: this.pageTitle,
      siteTitle: this.siteTitle,
      siteDescription: this.siteDescription,
      error: this.error,
      page: parseInt(this.page, 10),
      perPage: this.perPage,
      pageCount: this.pageCount,
      totalCount: this.totalCount
    };
  },
  dehydrate: function() {
    return this.getState();
  },
  rehydrate: function(state) {
    this.route = state.route;
    this.siteUrl = state.siteUrl;
    this.pageTitle = state.pageTitle;
    this.siteTitle = state.siteTitle;
    this.siteDescription = state.siteDescription;
    this.error = state.error;
    this.page = parseInt(state.page, 10);
    this.perPage = state.perPage;
    this.pageCount = state.pageCount;
    this.totalCount = state.totalCount;
    this.emitChange();
  }
});

module.exports = ApplicationStore;
