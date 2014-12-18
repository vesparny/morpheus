/** @jsx React.DOM */

'use strict';

var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var ApplicationStore = require('../../../shared/stores/ApplicationStore');

var Header = React.createClass({
  propTypes:{
    context: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <header className='main-header'>
        <nav className='main-nav overlay clearfix'>
        <a href='https://github.com/vesparny/morpheus' className="icon-morpheus blog-logo"><span className='hidden'>morpheus</span></a>
        <NavLink href='/a-static-page' context={this.props.context} className="menu-button">A Static Page</NavLink>
        </nav>
        <div className='vertical'>
          <div className='main-header-content inner'>
            <h1 className='page-title'>{this.props.context.getStore(ApplicationStore).getSiteTitle()}</h1>
            <h2 className='page-description'>{this.props.context.getStore(ApplicationStore).getSiteDescription()}</h2>
          </div>
        </div>
      </header>
    );
  }
});

module.exports = Header;
