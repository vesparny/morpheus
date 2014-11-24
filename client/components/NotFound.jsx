/** @jsx React.DOM */

'use strict';

var React = require('react');
var TodoActions = require('../actions/PostActions');

var NotFound = React.createClass({
  render: function() {
    return (
      <div>
        Not Found
      </div>
    );
  }
});

module.exports = NotFound;
