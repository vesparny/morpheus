/** @jsx React.DOM */

'use strict';

var React = require('react');
var Router = require('director').Router;
var App = require('./components/App');

var router = new Router();
function getInitialData(route) {
  var el = document.getElementById('initial-data');
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
    data.cssClass= 'home-template';
    React.render(<App data={data}/>, document.body);
  },
  single:function(slug){
    var data = getInitialData('single');
    data.state= data.state || {};
    data.params={slug:slug};
    data.cssClass= 'post-template';
    React.render(<App data={data}/>, document.body);
  }
};

router.configure({
  html5history: true,
  on:function(){
    window.scrollTo(0,0);
  },
  notfound: function(){
    //TODO
  }
});

router.on('/', routes.home);
router.on('/:slug', routes.single);

module.exports = router;
