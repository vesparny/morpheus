/** @jsx React.DOM */

'use strict';

var React = require('react');
window.React = React;

var CommentBox = require('./CommentBox.jsx');

React.renderComponent(<CommentBox url="comments.json" pollInterval={2000000}/>, document.querySelector('.content'));
