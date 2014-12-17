/** @jsx React.DOM */

'use strict';

var React = require('react');
var moment = require('moment');
var ApplicationStore = require('../../../stores/ApplicationStore');

var Footer = React.createClass({
  render: function() {
    var classString = 'footer site-footer clearfix';
    var year = moment().format('YYYY');
    return (
      <footer className={classString}>
         <section className="copyright">{this.props.context.getStore(ApplicationStore).getSiteTitle()} &copy; {year}</section>
         <section className="poweredby">
          <span className="engine">Built with love using <a href="https://github.com/vesparny/morpheus" >{this.props.context.getStore(ApplicationStore).getSiteTitle()}</a></span>
          <span className="theme">, blablabla theme inspired by <a href="https://github.com/TryGhost/Casper" >Casper</a></span>
         </section>
    </footer>
    );
  }
});

module.exports = Footer;
