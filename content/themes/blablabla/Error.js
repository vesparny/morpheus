'use strict';

var React = require('react');
var NotFound = React.createClass({
  render: function(){
    return (
      <div>Error: {this.props.error.message}</div>
    )
  }
});

module.exports = NotFound;
