/** @jsx React.DOM */

'use strict';

var React = require('react');

var Tag = React.createClass({

  render: function() {
    return (
      <a href={'/tag/'+this.props.tag.path}>{this.props.tag.name}</a>
    );
  }
});

module.exports = Tag;
