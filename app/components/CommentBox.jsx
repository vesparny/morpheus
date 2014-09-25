/** @jsx React.DOM */

'use strict';

var React = require('react');
var request = require('superagent');
var CommentList  = require('./CommentList.jsx');
var CommentForm  = require('./CommentForm.jsx');

var CommentBox = React.createClass({

  loadCommentsFromServer : function(){
    request
    .get(this.props.url)
    .type('json')
    .end(function(err, res){
      if (err) {
        alert("error")
      }
      this.setState({data: res.body});
    }.bind(this))
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    request
    .post(this.props.url)
    .type('json')
    .end(function(err, res){
      console.log(arguments)
      if (err) {
        alert("error")
      }
      if (res.ok) {
        this.setState({data: res.body});
      }
    }.bind(this))
  },
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
      );
  }
});

module.exports = CommentBox;
