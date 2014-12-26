'use strict';

var React = require('react');

var scriptIsAdded = false;

var Disqus = React.createClass({
  propTypes:{
    shortName: React.PropTypes.string.isRequired,
    identifier: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired

  },
  componentDidMount: function() {
    if (!scriptIsAdded) {
      return this.addScript();
    }
  },
  addScript: function() {
    var disqus_shortname = this.props.shortName; //jshint ignore:line
    var disqus_identifier = this.props.identifier;//jshint ignore:line
    var disqus_title = this.props.title;//jshint ignore:line
    var disqus_url = this.props.url;//jshint ignore:line

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = disqus_identifier; // jshint ignore:line
          this.page.url = disqus_url; // jshint ignore:line
          this.page.title = disqus_title; // jshint ignore:line
        }
      });
    }else{
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; //jshint ignore:line
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }
  },
  render: function() {
    return <div id="disqus_thread"></div>;
  }
});

module.exports = Disqus;
