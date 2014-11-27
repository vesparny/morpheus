/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <header className="main-header post-head no-cover">
        <nav className="main-nav  clearfix">
          <a className="back-button icon-arrow-left" href="http://localhost:3000">Home</a>
          <a className="subscribe-button icon-feed" href="http://localhost:3000/rss/">Subscribe</a>
          </nav>
      </header>
    );
  }
});

module.exports = Header;
