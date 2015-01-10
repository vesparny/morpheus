'use strict';

var React = require('react');
var Tag = require('./Tag');
var clientUtils = require('../../../client/utils');

var Tags = React.createClass({
  propTypes:{
    tags: React.PropTypes.array.isRequired,
    context: React.PropTypes.object.isRequired
  },
  render: function() {
    var tags = [];
    var pre =  '';
    this.props.tags.forEach(function(tag, index){
      tags.push(<Tag tag={tag} key={index} context={this.props.context}/>);
    }.bind(this));
    tags = clientUtils.intersperse(tags, ', ');
    if (this.props.tags.length > 0) {
      pre =  <span> on </span>;
    }
    return (
      <div className="tags">
      {pre}
      {tags}
      </div>
    );
  }
});

module.exports = Tags;
