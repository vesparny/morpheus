var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/PostActions');
var Link = require('react-router').Link;

var PostListElement = React.createClass({

  propTypes: {
   post: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    var post = this.props.post || {};

    return (
    <article className="post">
        <header className="post-header">
            <h2 className="post-title"><Link to="single" params={{slug: post.slug}}>{post.title}</Link></h2>
        </header>
        <section className="post-excerpt">
            <p dangerouslySetInnerHTML={{__html: post.excerpt}}></p><a class="read-more" href={post.url}>&raquo;</a>
        </section>
        <footer className="post-meta">
            {post.author}
            {post.tags}
            <time className="post-date">{post.date}</time>
        </footer>
      </article>
    );
  }
});

module.exports = PostListElement;
