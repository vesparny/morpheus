/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./PostListElement');
var FrontEndActions = require('../../../actions/FrontEndActions');

var FrontEndStore = require('../../../stores/FrontEndStore');
var StoreMixin = require('fluxible-app').StoreMixin;
var Loader = require('./Loader');
var Header = require('./Header');
var Footer = require('./Footer');

var PostList = React.createClass({
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
      posts: this.getStore(FrontEndStore).getAll(),
      cssClass: 'home'
    };
  },
  componentDidMount: function() {
    if(!this.state.posts.length){
      this.props.context.executeAction(FrontEndActions.getAllPosts);
    }
  },
  componentWillUnmount: function(){
    this.getStore(FrontEndStore).initialize();
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  render: function() {
    var posts = [];
    var showLoader = this.state.posts.length === 0;
    this.state.posts.forEach(function(post, index){
      posts.push(<PostListElement key={index} post={post} context={this.props.context}/>);
    }.bind(this));
    var classes = 'wrapper '+this.state.cssClass;
    return (
      <div className={classes}>
      <Header/>
        <div className='main-content container'>
        <div className='post-container'>
        <Loader class={!showLoader ? 'hidden' : ''}/>
        {posts}
        </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

module.exports = PostList;
