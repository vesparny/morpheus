/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavLink = require('flux-router-component').NavLink;
var Tags = require('./Tags');


var PostListElement = React.createClass({

  propTypes: {
   post: ReactPropTypes.object.isRequired
  },

  render: function() {
    var post = this.props.post || {};
    var to = '/'+post.slug;
    return (
    <article className="post">
        <header className="post-header">
            <h2 className="post-title"><NavLink href={to} routeName={'single'} context={this.props.context} >{post.title}</NavLink></h2>
        </header>
        <section className="post-excerpt">
            <p dangerouslySetInnerHTML={{__html: post.excerpt}}></p><a className="read-more" href={post.url}>&raquo;</a>
        </section>

        <footer className="post-meta">
        <img className="author-thumb full-img" src="//www.gravatar.com/avatar/b191979120db1749f5f8c8cadc2ac4a9?d=404&amp;s=250" alt="Author image" nopin="nopin" />
        <a href="/author/alessandro/">alessandro arnodo</a>
        <Tags tags={this.props.post.tags} />
        <time className="post-date" dateTime={post.date}>{post.date}</time>
        </footer>
      </article>
    );
  }
});

module.exports = PostListElement;
