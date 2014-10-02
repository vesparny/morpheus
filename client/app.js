/** @jsx React.DOM */

'use strict';

var React = require('react');
var router = require('./router');


//allow react dev tools work
window.React = React;

React.renderComponent(router, document.body);
