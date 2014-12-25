'use strict';

var React = require('react');

var scriptIsAdded = false;

var Clicky = React.createClass({
  propTypes:{
    code: React.PropTypes.number.isRequired
  },
  componentDidMount: function() {
    if (!scriptIsAdded) {
      return this.addScript();
    }
  },
  addScript: function() {
    window.clicky_site_ids = window.clicky_site_ids || []; // jshint ignore:line
    window.clicky_site_ids.push(this.props.code); // jshint ignore:line
    var el;
    var s;
    scriptIsAdded = true;
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = '//static.getclicky.com/js';
    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(el, s);
  },
  render: function() {
    return null;
  }
});

module.exports = Clicky;
