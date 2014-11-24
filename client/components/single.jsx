/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostListElement = require('./PostListElement.jsx');
var PostActions = require('../actions/PostActions');
var PostStore = require('../stores/PostStore');
var storeWatchMixin = require('../mixins/StoreWatchMixin');
var Aside = require('./Aside.jsx');

var Single = React.createClass({
  mixins: [storeWatchMixin([PostStore])],

  getState: function() {
    return {
      single: PostStore.getSingle()
    };
  },

  componentWillReceiveProps: function(newProps, oldProps) {
    console.log("revceived single", arguments);
  },

  componentDidMount: function() {
    if(!this.state.single){
      PostActions.getSingle(this.props.params.slug);
    }
  },

  render: function() {
    if(!this.state.single){
      return <div>Loading ... </div>;
    }
    return (
    <article className="post">

        <header className="post-header">
            <h1 className="post-title">{this.state.single.title}</h1>
            <section className="post-meta">
                <time className="post-date" >{this.state.single.date}</time> {this.state.single.tags}
            </section>
        </header>

        <section className="post-content" dangerouslySetInnerHTML={{__html: this.state.single.content}}></section>

        <footer className="post-footer"></footer>
        </article>
    );
  }
});

module.exports = Single;
