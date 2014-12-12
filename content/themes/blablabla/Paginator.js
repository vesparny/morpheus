/** @jsx React.DOM */

'use strict';

var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Paginator = React.createClass({
  propTypes:{
    page: React.PropTypes.number.isRequired,
    pageCount: React.PropTypes.number.isRequired,
    totalCount: React.PropTypes.number.isRequired,
    context:React.PropTypes.object.isRequired
  },
  render: function() {
    var prev = '';
    var next = '';
    if (this.props.page > 1) {
      var toPrev = this.props.page === 2  ?  '/' : '/page/'+(this.props.page - 1);
      prev = <NavLink href={toPrev} className="newer-posts" context={this.props.context} >← Newer Posts</NavLink>;
    }
    if (this.props.page < this.props.pageCount) {
      var toNext = '/page/'+ (this.props.page + 1);
      next = <NavLink href={toNext} className="older-posts" context={this.props.context} >Older Posts →</NavLink>;
    }
    return (
      <nav className="pagination" role="navigation">
        {prev}
        <span className="page-number">Page {this.props.page} of {this.props.pageCount}</span>
        {next}
      </nav>
    );
  }
});

module.exports = Paginator;
