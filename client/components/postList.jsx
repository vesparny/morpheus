/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./postListElement.jsx');
var PostActions = require('../actions/PostActions');
var PostStore = require('../stores/PostStore');
var storeWatchMixin = require('../mixins/StoreWatchMixin');
var Aside = require('./aside.jsx');

var PostList = React.createClass({
  mixins: [storeWatchMixin([PostStore])],

  getState: function() {
    return {
      posts: PostStore.getAll()
    };
  },

getInitialState: function(props) {
  return {
    posts:this.props.posts
  };
  if (props) {
    return props;
  } else {
    return this.getState();
  }
},

  componentWillReceiveProps: function(newProps, oldProps) {
    console.log('newProps')
    console.log("all,l,lsasa", arguments);
    this.setState(this.getInitialState(newProps));
  },
  componentDidMount: function() {
    if(!this.state.posts.length){
      PostActions.getAllPosts();
    }
  },

  render: function() {
    var posts = [];
    if(!this.state.posts.length){
      return <div>Loading ... </div>;
    }

    this.state.posts.forEach(function(post, index){
      posts.push(<PostListElement key={index} post={post} router={this.props.router}/>);
    }.bind(this));

    return (
      <div className='post-container'>
        {posts}
      </div>
    );
  }
});

module.exports = PostList;
