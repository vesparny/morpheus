/** @jsx React.DOM */

'use strict';

var React = require('react');
var router = require('./router.js');

window.React = React;


router.init();
//https://medium.com/react-tutorials/react-backbone-router-c00be0cf1592
//http://bl.ocks.org/simenbrekken/9359621
//http://www.htmlxprs.com/post/20/creating-isomorphic-apps-with-react-and-nodejs
//http://www.princeton.edu/~crmarsh/react-ssr/
//http://scotch.io/tutorials/javascript/build-a-real-time-twitter-stream-with-node-and-react-js
//http://jaketrent.com/post/send-props-to-children-react/
//https://github.com/spikebrehm/isomorphic-tutorial
//http://blog.risingstack.com/from-angularjs-to-react-the-isomorphic-way/
//https://github.com/naman34/yarr
//https://github.com/yahoo/flux-router-component
//https://github.com/jaredly/github-issues-viewer
/*
React attempted to use reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server.
 */
