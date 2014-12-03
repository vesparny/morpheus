/** @jsx React.DOM */

'use strict';

var React = require('react');
var gravatar = require('gravatar');

var Gravatar = React.createClass({

  render: function() {
    var img = gravatar.url(this.props.email, {s:250}, true);
    return (
      <img className="author-thumb full-img" src={img} alt="Author image" nopin="nopin" />
    );
  }
});

module.exports = Gravatar;
