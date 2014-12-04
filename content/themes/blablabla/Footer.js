/** @jsx React.DOM */

'use strict';

var React = require('react');

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
          <span className="engine">Built with love using <a href={this.state.url} >{this.state.title}</a></span>
          <span className="theme">, blablabla theme inspired by <a href={this.state.casperUrl} >Casper</a></span>
         </section>
    </footer>
    );
  }
});

module.exports = Header;
