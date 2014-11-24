/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./postListElement.jsx');
var PostActions = require('../actions/PostActions');
var PostStore = require('../stores/PostStore');
var storeWatchMixin = require('../mixins/StoreWatchMixin');
var Aside = require('./Aside.jsx');

var PostList = React.createClass({
  mixins: [storeWatchMixin([PostStore])],

  getState: function() {
    return {
      posts: PostStore.getAll()
    };
  },
  componentWillReceiveProps: function(newProps, oldProps) {
    console.log("revceived pl", arguments);
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
