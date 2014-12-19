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
    var el;
    var s;
    scriptIsAdded = true;
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = '//static.getclicky.com/js';
    s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(el, s);
    try {
      window.clicky.init(this.props.code);
    } catch (e) {}
  },
  render: function() {
    return null;
  }
});

module.exports = Clicky;
