'use strict';

var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Header = React.createClass({
  propTypes:{
    context: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <header className="main-header post-head no-cover">
        <nav className="main-nav clearfix">
          <NavLink className="menu-button back-button inverted icon-arrow-left" routeName={'home'} context={this.props.context} >Home</NavLink>
          </nav>
      </header>
    );
  }
});

module.exports = Header;
