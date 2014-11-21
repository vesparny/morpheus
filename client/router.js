/** @jsx React.DOM */
var React = require("react");
var Router = require('director').Router;

// Handlers
var App = require('./components/app.jsx');

var NotFound = require('./components/notFound.jsx');
var PostList = require('./components/postList.jsx');
var Single = require('./components/Single.jsx');
var router = new Router();
function getInitialData(route) {
  var el = document.getElementById("initial-data");
  var data = {
      route : route,
      state:[],
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
    React.render(<App data={data}/>, document.getElementById('app'));
  },
  single:function(slug){
    var data = getInitialData('single');
    data.params={slug:slug};
    React.render(<App data={data}/>, document.getElementById('app'));
  }
};

router.configure({
  html5history: true
});

router.on('/', routes.home);
router.on('/:slug', routes.single);

module.exports = router;
