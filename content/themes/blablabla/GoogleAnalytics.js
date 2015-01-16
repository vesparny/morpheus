'use strict';

var React = require('react');

var GoogleAnalytics = React.createClass({
  propTypes:{
    code: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    return this.addScript();
  },
  addScript: function() {
    if (!window._gaq) {
      window._gaq = [];
      window._gaq.push(['_setAccount', this.props.code]);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    }
  },
  render: function() {
    return null;
  }
});

module.exports = GoogleAnalytics;
