'use strict';

var React = require('react');
var NotFound = React.createClass({
  render: function(){
    return (
      <div>{this.props.err}</div>
    )
  }
});

module.exports = NotFound;
