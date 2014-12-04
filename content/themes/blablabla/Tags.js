/** @jsx React.DOM */

'use strict';

var React = require('react');
var Tag = require('./Tag');
var clientUtils = require('../../../utils').client;

var Tags = React.createClass({

  render: function() {

    if (!this.props.tags) {
      return null;
    }else{
      var tags = [];
      var pre = '';
      if (this.props.tags.length) {
        pre = <span> on </span>;
        this.props.tags.forEach(function(tag, index){
          tags.push(<Tag tag={tag} key={index} context={this.props.context}/>);
        }.bind(this));
      }
      tags = clientUtils.intersperse(tags, ', ');
      return (
        <div className="tags">
        {pre}
        {tags}
        </div>
      );
    }
  }
});

module.exports = Tags;
