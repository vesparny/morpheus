/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./PostListElement');
var FrontEndActions = require('../../../actions/FrontEndActions');
var FrontEndStore = require('../../../stores/FrontEndStore');
var InitialStateMixin = require('../../../mixins/InitialStateMixin');
var Loader = require('./Loader');
var HeaderSingle = require('./HeaderSingle');
var Footer = require('./Footer');
var Tags = require('./Tags');
var StoreMixin = require('fluxible-app').StoreMixin;
var gravatar = require('gravatar');
var NavLink = require('flux-router-component').NavLink;


var Single = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: {
      _onChange: [FrontEndStore]
    }
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      single: this.getStore(FrontEndStore).getSingle(),
      cssClass: 'single',
      siteUrl : this.getStore(FrontEndStore).getSiteUrl()
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  componentDidMount: function() {
    if(!this.state.single.title){
      var slug = this.props.slug;
      this.props.context.executeAction(FrontEndActions.getSingle, {
        slug:slug
      });
    }
  },
  componentWillUnmount: function(){
    this.getStore(FrontEndStore).initialize();
  },
  componentWillReceiveProps: function(newProps, oldProps) {
    console.log('revceived', newProps);
  },

  render: function() {
    var showLoader = !this.state.single.title;
    var style = {
      'backgroundImage': 'url('+gravatar.url(this.state.single.email, {s:250}, true)+')'
    };
    var classes = 'wrapper '+this.state.cssClass;
    var footer  = '';
    var header = '';
    if (this.state.single.type === 'post') {
      footer =
      <footer className="post-footer">
        <figure className="author-image">
        <NavLink href={this.state.siteUrl} context={this.props.context} className="img" style={style} ><span className="hidden">alessandro arnodo's Picture</span></NavLink>
        </figure>
        <section className="author">
        <h4>{this.state.single.author}</h4>

        <div className="author-meta">
        <p>Just another code Monkey</p>

        </div>
        </section>
        <section className="share">
        <h4>Share this post</h4>
        <div className="text-center">
        <a className="icon-twitter" href={"https://twitter.com/share?text="+this.state.single.title+"&amp;"+this.state.single.fullUrl} onclick="window.open(this.href, 'twitter-share', 'width=550,height=235');return false;">
        <span className="hidden">Twitter</span>
        </a>
        <a className="icon-facebook" href={"https://www.facebook.com/sharer/sharer.php?u="+this.state.single.fullUrl} onclick="window.open(this.href, 'facebook-share','width=580,height=296');return false;">
        <span className="hidden">Facebook</span>
        </a>
        <a className="icon-google-plus" href={"https://plus.google.com/share?url="+this.state.single.fullUrl} onclick="window.open(this.href, 'google-plus-share', 'width=490,height=530');return false;">
        <span className="hidden">Google+</span>
        </a>
        </div>
        </section>
      </footer>

      header =
      <header className="post-header">
      <h1 className="post-title">{this.state.single.title}</h1>
      <section className="post-meta">
      <time className="post-date" >{this.state.single.date}</time>
      <Tags tags={this.state.single.tags} />
      </section>
      </header>
    }
    return (
      <div className={classes}>
        <HeaderSingle context={this.props.context}/>
        <div className='main-content container'>
          <article className="post">
            <Loader class={!showLoader ? 'hidden' : ''}/>
            <div className={showLoader ? 'hidden' : ''}>
            {header}
          <section className="post-content" dangerouslySetInnerHTML={{__html: this.state.single.content}}></section>
          {footer}
        </div>
      </article>
    </div>
    <Footer context={this.props.context}/>
    </div>
    );
  }
});

module.exports = Single;
