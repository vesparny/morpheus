'use strict';

var createStore = require('fluxible-app/utils/createStore');
var assign = require('object-assign');

var MetaStore = createStore({
  storeName: 'MetaStore',
  handlers: {
    'SET_META': 'setMeta'
  },
  initialize: function(dispatcher) { //jshint ignore:line
    this.meta = {};
  },
  setMeta: function(meta) {
    this.meta = {};
    this.meta = assign({}, meta);
    delete this.meta.content;
    delete this.meta.excerpt;

    //meta
    this.meta.ogType = this.meta.type === 'post' ? 'article' : 'website';
    this.meta.metaImage = this.meta.metaImage ? this.meta.metaImage : '';
    this.meta.metaTitle = this.meta.metaTitle ? this.meta.metaTitle : '';
    this.meta.metaDescription = this.meta.metaDescription ? this.meta.metaDescription : this.meta.description;
    this.emitChange();
  },
  getState: function() {
    return {
      meta: this.meta
    };
  },
  dehydrate: function() {
    return this.getState();
  },
  rehydrate: function(state) {
    this.meta = state.meta;
    this.emitChange();
  }
});

module.exports = MetaStore;
