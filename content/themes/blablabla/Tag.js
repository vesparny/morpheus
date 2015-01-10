'use strict';

var React = require('react');
//var NavLink = require('flux-router-component').NavLink;

var Tag = React.createClass({
  propTypes:{
    tag: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <span className="tag-text">{this.props.tag.name}</span>
      //<NavLink href={'/tag/'+this.props.tag.path} routeName={'tag'} context={this.props.context} >{this.props.tag.name}</NavLink>
    );
  }
});

module.exports = Tag;
