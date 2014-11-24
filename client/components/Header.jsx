/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    var className = "site-footer clearfix";
    return (
      <header className={className}>
      </header>
    );
  }
});

module.exports = Header;
