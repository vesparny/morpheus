/** @jsx React.DOM */

'use strict';

var React = require("react");
var Router = require('director').Router;

// Handlers
var App = require('./components/App.jsx');

var NotFound = require('./components/NotFound.jsx');
var PostList = require('./components/PostList.jsx');
var Single = require('./components/Single.jsx');

var router = new Router();
function getInitialData(route) {
  var el = document.getElementById("initial-data");
  var data = {
      route : route
  };
  if (el) {
    data = JSON.parse(el.innerHTML);
    el.parentNode.removeChild(el);
  }
  data.router = router;
  return data;
}

var routes = {
  home: function () {
    var data = getInitialData('home');
    data.state= data.state || [];
    React.render(<App data={data}/>, document.body);
  },
  single:function(slug){
    var data = getInitialData('single');
    data.state= data.state || {};
    data.params={slug:slug};
    console.log('data', data);
    React.render(<App data={data}/>, document.body);
  }
};

router.configure({
  html5history: true
});

router.on('/', routes.home);
router.on('/:slug', routes.single);

module.exports = router;
