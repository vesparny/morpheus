/** @jsx React.DOM */

'use strict';

var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Header = React.createClass({
  getInitialState: function() {
    return {
      title:'Flash',
      url: 'https://github.com/vesparny/flash',
      casperUrl : 'https://github.com/TryGhost/Casper'
    };
  },
  render: function() {
    var classString = 'footer site-footer clearfix';
    return (
      <footer className={classString}>
         <section className="copyright">{this.state.title} &copy;</section>
         <section className="poweredby">
          Proudly published with <NavLink href={this.state.url} routeName={'single'} context={this.props.context} >{this.state.title}</NavLink>, blablabla theme inspired by <NavLink href={this.state.casperUrl} routeName={'single'} context={this.props.context} >Casper</NavLink>
          </section>
    </footer>
    );
  }
});

module.exports = Header;
