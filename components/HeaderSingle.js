/** @jsx React.DOM */

'use strict';

var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Header = React.createClass({
  render: function() {
    return (
      <header className="main-header post-head no-cover">
        <nav className="main-nav  clearfix">
          <NavLink className="back-button icon-arrow-left" routeName={'home'} context={this.props.context} >Home</NavLink>
          <a className="subscribe-button icon-feed" href="http://localhost:3000/rss/">Subscribe</a>
          </nav>
      </header>
    );
  }
});

module.exports = Header;
