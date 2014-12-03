/** @jsx React.DOM */

'use strict';

var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Header = React.createClass({
  render: function() {
    return (
      <header className='main-header'>
        <nav className='main-nav overlay clearfix'>
        <NavLink href='https://github.com/vesparny/flash' context={this.props.context} className="icon-flash blog-logo"><span className='hidden'>flash</span></NavLink>
        <NavLink href='/a-static-page' context={this.props.context} className="menu-button">A Static Page</NavLink>
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
