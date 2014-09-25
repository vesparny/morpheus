/** @jsx React.DOM */

'use strict';

var React = require('react');
var marked = require('marked');

var CommentBox = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString());
    return (
      <div className="comment">
      <h2 className="commentAuthor">
      {this.props.author}
      </h2>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
      );
  }
});

module.exports = CommentBox;
