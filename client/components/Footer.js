/** @jsx React.DOM */

'use strict';

var React = require('react');

var Header = React.createClass({
  render: function() {
    var classString = 'site-footer clearfix';
    return (
      <footer className={classString}>
         <section className="copyright"><a href="url">title</a> &copy;</section>
         <section className="poweredby">Proudly published with <a href="https://nklnlk">Flash</a></section>
    </footer>
    );
  }
});

module.exports = Header;
