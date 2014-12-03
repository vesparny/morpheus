/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <header className='main-header'>
        <nav className='main-nav overlay clearfix'>
        <a className='icon-flash blog-logo' href='http://localhost:3000'>
          <span className='hidden'>flash</span>
        </a>
        <a className='menu-button' href='{{@blog.url}}'>page</a>
        <a className='menu-button' href='/about'>About</a>
        <a className='menu-button subscribe-button icon icon-feed' href='http://localhost:2368/rss/'>Subscribe</a>
          </nav>
        <div className='vertical'>
          <div className='main-header-content inner'>
            <h1 className='page-title'>Flash</h1>
            <h2 className='page-description'>The next generation blogging platform.</h2>
          </div>
        </div>
      </header>
    );
  }
});

module.exports = Header;
