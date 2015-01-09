'use strict';

var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Paginator = React.createClass({
  propTypes:{
    page: React.PropTypes.string.isRequired,
    pageCount: React.PropTypes.number.isRequired,
    totalCount: React.PropTypes.number.isRequired,
    context:React.PropTypes.object.isRequired
  },
  render: function() {
    var prev = '';
    var next = '';
    var page = parseInt(this.props.page, 10);
    page = isNaN(page) ? 1 : page;
    if (page > 1) {
      var toPrev = page === 2  ?  '/' : '/page/'+(page - 1)+'/';
      prev = <NavLink href={toPrev} className="newer-posts" context={this.props.context} >← Newer Posts</NavLink>;
    }
    if (page < this.props.pageCount) {
      var toNext = '/page/'+ (page + 1)+'/';
      next = <NavLink href={toNext} className="older-posts" context={this.props.context} >Older Posts →</NavLink>;
    }
    return (
      <nav className="pagination" role="navigation">
        {prev}
        <span className="page-number">Page {page} of {this.props.pageCount}</span>
        {next}
      </nav>
    );
  }
});

module.exports = Paginator;
