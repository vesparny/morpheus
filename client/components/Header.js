/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    var className = "site-footer clearfix";
    return (
      <header className="main-header no-cover">
        <nav className="main-nav overlay clearfix">
          <a className="subscribe-button icon-feed" href="http://localhost:2368/rss/">Subscribe</a>
          </nav>
        <div className="vertical">
          <div className="main-header-content inner">
            <h1 className="page-title">Flash</h1>
            <h2 className="page-description">The next generation blogging platform.</h2>
          </div>
        </div>
      </header>
    );
  }
});

module.exports = Header;
