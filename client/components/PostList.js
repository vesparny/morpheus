/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./postListElement');
var FrontEndActions = require('../actions/FrontEndActions');
var FrontEndStore = require('../stores/FrontEndStore');
var InitialStateMixin = require('../mixins/InitialStateMixin');
var Loader = require('./Loader');
var Header = require('./Header');
var Footer = require('./Footer');


var PostList = React.createClass({
  mixins: [FrontEndStore.mixin , InitialStateMixin],

  getState: function() {
    return {
      posts: FrontEndStore.getAll()
    };
  },
  componentWillReceiveProps: function(newProps, oldProps) {
    console.log("revceived pl", arguments);
  },
  componentDidMount: function() {
    if(!this.state.posts.length){
      FrontEndActions.getAllPosts();
    }
  },
  render: function() {
    var posts = [];
    var showLoader = this.state.posts.length === 0;
    this.state.posts.forEach(function(post, index){
      posts.push(<PostListElement key={index} post={post} router={this.props.router}/>);
    }.bind(this));
    var classes = 'wrapper '+this.props.cssClass;
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
