/** @jsx React.DOM */

'use strict';

var React = require('react');
var PostList = require('./PostList');
var Single = require('./Single');


var App = React.createClass({
  render: function(){
    var page;
    var route = this.props.data.route;

    if (route === 'home') {
      page = <PostList posts={this.props.data.state} router={this.props.data.router} cssClass={route}/>;
    }
    if (route === 'single') {
      page = <Single single={this.props.data.state} params={this.props.data.params} router={this.props.data.router} cssClass={route}/>;
    }
    return page;
  }
});

module.exports = App;
