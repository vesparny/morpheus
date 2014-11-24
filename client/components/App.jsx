/** @jsx React.DOM */

'use strict';

var React = require('react');
var Container = require('./Container.jsx');
var PostList = require('./PostList.jsx');
var Single = require('./Single.jsx');


var App = React.createClass({
  render: function(){
    var page;
    if (this.props.data.route === 'home') {
      page = <PostList posts={this.props.data.state} router={this.props.data.router}/>;
    }
    if (this.props.data.route === 'single') {
      page = <Single single={this.props.data.state} params={this.props.data.params} router={this.props.data.router}/>;
    }
    return (
      <Container page={page}/>
    );
  }
});

module.exports = App;
