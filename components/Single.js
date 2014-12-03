/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./PostListElement');
var FrontEndActions = require('../actions/FrontEndActions');
var FrontEndStore = require('../stores/FrontEndStore');
var InitialStateMixin = require('../mixins/InitialStateMixin');
var Loader = require('./Loader');
var HeaderSingle = require('./HeaderSingle');
var Footer = require('./Footer');
var Tags = require('./Tags');
var StoreMixin = require('fluxible-app').StoreMixin;

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
      cssClass: 'single'
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
      'backgroundImage': 'url(//gravatar.com/avatar/b191979120db1749f5f8c8cadc2ac4a9?d=404&amp;s=250)'
    };
    var classes = 'wrapper '+this.state.cssClass;
    return (
      <div className={classes}>
        <HeaderSingle context={this.props.context}/>
        <div className='main-content container'>
          <article className="post">
            <Loader class={!showLoader ? 'hidden' : ''}/>
            <div className={showLoader ? 'hidden' : ''}>
              <header className="post-header">
                <h1 className="post-title">{this.state.single.title}</h1>
                <section className="post-meta">
                  <time className="post-date" >{this.state.single.date}</time>
                  <Tags tags={this.state.single.tags} />
                  </section>
              </header>

          <section className="post-content" dangerouslySetInnerHTML={{__html: this.state.single.content}}></section>
          <footer className="post-footer">
            <figure className="author-image">
              <a className="img" href="/author/alessandro/" style={style}><span className="hidden">alessandro arnodo's Picture</span></a>
            </figure>
          <section className="author">
            <h4><a href="/author/alessandro/">alessandro arnodo</a></h4>

            <p>Read <a href="/author/alessandro/">more posts</a> by this author.</p>
            <div className="author-meta">
            <p>Founder at Ghost.org. Writes about open source, startup life, non-profits, and publishing platforms. Travels the world with a bag of kites.</p>

            </div>
          </section>
          <section className="share">
            <h4>Share this post</h4>
            <div className="text-center">
              <a className="icon-twitter" href="https://twitter.com/share?text=Welcome%20to%20Ghost&amp;url=http://localhost:2368/2014/11/25/welcome-to-ghost/" onclick="window.open(this.href, 'twitter-share', 'width=550,height=235');return false;">
                <span className="hidden">Twitter</span>
              </a>
              <a className="icon-facebook" href="https://www.facebook.com/sharer/sharer.php?u=http://localhost:2368/2014/11/25/welcome-to-ghost/" onclick="window.open(this.href, 'facebook-share','width=580,height=296');return false;">
                <span className="hidden">Facebook</span>
              </a>
              <a className="icon-google-plus" href="https://plus.google.com/share?url=http://localhost:2368/2014/11/25/welcome-to-ghost/" onclick="window.open(this.href, 'google-plus-share', 'width=490,height=530');return false;">
                <span className="hidden">Google+</span>
              </a>
            </div>
          </section>
          </footer>
        </div>
      </article>
    </div>
    <Footer/>
    </div>
    );
  }
});

module.exports = Single;
