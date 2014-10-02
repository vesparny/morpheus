/** @jsx React.DOM */

'use strict';

var React = require('react');
var Single = require('./single.jsx');
var PostActions = require('../actions/PostActions');
var PostStore = require('../stores/PostStore');
var StoreWatchMixin = require('../mixins/StoreWatchMixin');

var PostContainer = React.createClass({
  mixins: [StoreWatchMixin(PostStore)],

  getState: function() {
    return {
      posts: PostStore.getAll()
    };
  },

  handleClick:function(){
    PostActions.getAllPosts();
  },

  render: function() {
    var posts = [];
    
    this.state.posts.forEach(function(post){
      posts.push(<Single post={post} />);
    });

    return (
      <div>
        <button onClick={this.handleClick}>Load posts</button>
        <section id="main">
        {posts}
        </section>
      </div>
    );
  }
});

module.exports = PostContainer;
