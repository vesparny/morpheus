'use strict';

var React = require('react');
var cx = require('react/lib/cx');
var PostListElement = require('./PostListElement');
var ContentActions = require('../../../shared/actions/ContentActions');
var ContentStore = require('../../../shared/stores/ContentStore');
var InitialStateMixin = require('../../../shared/mixins/InitialStateMixin');
var Loader = require('./Loader');
var HeaderSingle = require('./HeaderSingle');
var Footer = require('./Footer');
var Tags = require('./Tags');
var StoreMixin = require('fluxible').StoreMixin;
var gravatar = require('gravatar');
var NavLink = require('flux-router-component').NavLink;
var ApplicationStore = require('../../../shared/stores/ApplicationStore');
var Disqus = require('./Disqus');
var Gravatar = require('./Gravatar');

var Single = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: {
      _onChange: [ContentStore]
    }
  },
  propTypes: {
    context: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      single: this.getStore(ContentStore).getState().content,
      cssClass: 'single'
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  componentDidMount: function() {
    if(!this.state.single.title){
      this.props.context.executeAction(ContentActions.single, {
        slug: this.props.params.title
      });
    }
  },
  componentWillReceiveProps: function(props){
    if (props.page !== this.props.page) {
      this.props.context.executeAction(ContentActions.single, {
        slug: props.params.title
      });
    }
  },
  componentWillUnmount: function(){
    this.getStore(ContentStore).initialize();
  },
  render: function() {
    var showLoader = !this.state.single.title;
    var date = this.state.single.date;
    var style = {
      'backgroundImage': 'url('+gravatar.url(this.state.single.email, {s:250}, true)+')'
    };
    var classesMap = {};
    classesMap.wrapper = true;
    classesMap[this.state.cssClass] = true;
    var classes = cx(classesMap);
    var footer  = '';
    var header = '';
    var disqus = null;
    var siteGlobals = this.props.context.getStore(ApplicationStore).getState().globals;
    var authors = siteGlobals.authors;
    var authorMeta = authors[this.state.single.email] && authors[this.state.single.email].meta;
    var disqusComments = siteGlobals.disqusComments;
    if (this.state.single.type === 'post') {
      if (disqusComments) {
        disqus = <Disqus shortName={disqusComments} identifier={this.state.single.slug} title={this.state.single.title} url={ this.props.context.getStore(ApplicationStore).getState().globals.siteUrl + this.state.single.permalink}/>;
      }
      footer =
      <footer className="post-footer">
        <figure className="author-image">
        <NavLink href={this.props.siteUrl} context={this.props.context} className="img" style={style} ><span className="hidden">alessandro arnodo's Picture</span></NavLink>
        </figure>
        <section className="author">
        <h4>{this.state.single.author}</h4>

        <div className="author-meta">
        <p>{authorMeta}</p>
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
      <Gravatar email={this.state.single.email}/>
      {this.state.single.author}
      <Tags tags={this.state.single.tags} context={this.props.context}/>
      <time className="post-date" dateTime={date}>{date}</time>
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
          {disqus}
        </div>
      </article>
    </div>
    <Footer context={this.props.context}/>
    </div>
    );
  }
});

module.exports = Single;
