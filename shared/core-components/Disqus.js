'use strict';

var React = require('react');

var scriptIsAdded = false;

var Disqus = React.createClass({
  propTypes:{
    code: React.PropTypes.number.isRequired
  },
  componentDidMount: function() {
    if (!scriptIsAdded) {
      return this.addScript();
    }
  },
  addScript: function() {
    var disqus_shortname = 'arnodo'; //jshint ignore:line
    var disqus_identifier = 'mettiamo la slug qua???che è univoca';//jshint ignore:line
    var disqus_title = 'a unique title for each page where Disqus is present';//jshint ignore:line
    var disqus_url = 'a unique URL for each page where Disqus is present';//jshint ignore:line

    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js'; //jshint ignore:line
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  },
  render: function() {
    return <div id="disqus_thread"></div>;
  }
});

module.exports = Disqus;
