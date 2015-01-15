'use strict';

var React = require('react');
var PostList = require('./PostList');
var Single = require('./Single');
var ErrorPage = require('./Error');
var ApplicationStore = require('../../../shared/stores/ApplicationStore');
var MetaStore = require('../../../shared/stores/MetaStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible-app').StoreMixin;
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var Clicky = require('./Clicky');
var assign = require('object-assign');

var App = React.createClass({
  mixins: [RouterMixin, StoreMixin],
  statics: {
    storeListeners: [ApplicationStore, MetaStore]
  },
  propTypes:{
    context:React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return assign(this.getStore(ApplicationStore).getState(), this.getStore(MetaStore).getState());
  },
  onChange: function () {
    this.setState(assign(this.getStore(ApplicationStore).getState(), this.getStore(MetaStore).getState()));
  },
  handleDomChanges: function(){
    if (canUseDOM) {
      //scroll
      window.scrollTo(0,0);
      //handle metas
      document.title = this.state.meta.title || this.state.globals.siteTitle;
      var metaTag = document.getElementsByTagName('meta');
      [].forEach.call(metaTag, function(meta){
        if (meta.getAttribute('name') === 'description') {
            meta.content = this.state.meta.description;
        }
      }.bind(this));

      //hljs
      var aCodes = document.getElementsByTagName('code');
      for (var i=0; i < aCodes.length; i+=1) {
        window.hljs.highlightBlock(aCodes[i]);
      }
    }
  },
  render: function(){
    var clicky = null;
    if (this.state.globals.clickyAnalytics) {
      clicky = <Clicky code={this.state.globals.clickyAnalytics}/>;
    }

    this.handleDomChanges();
    if (this.state.error) {
      return (
        <div>
          <ErrorPage context={this.props.context} error={this.state.error}/>
          {clicky}
        </div>
      );
    }
    if (this.state.route.name === 'home' || this.state.route.name === 'page') {
      return (
        <div>
        <PostList context={this.props.context} page={this.state.route.params.page} pageCount={this.state.meta.pagination.pageCount} totalCount={this.state.meta.pagination.totalCount}/>
        {clicky}
        </div>
      );
    }
    if (this.state.route.name === 'post' || this.state.route.name === 'static') {
      return (
        <div>
        <Single context={this.props.context} params={this.state.route.params}/>
        {clicky}
        </div>
      );
    }
    /*
    if (this.state.route.name === 'tag') {
      return (
        <div>
        <TagPage context={this.props.context} slug={this.state.route.params.tag} siteUrl={this.state.globals.siteUrl}/>
        {clicky}
        </div>
      );
    }
    */
    return null;
  }
});

module.exports = App;
