/** @jsx React.DOM */
var React = require("react");

var Router = require("react-router");
var Routes = Router.Routes;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

// Handlers
var App = require('./components/app.jsx');

var NotFound = require('./components/notFound.jsx');
var PostList = require('./components/postList.jsx');
var Single = require('./components/Single.jsx');

module.exports = {
  setup:function(){
    var content='page-content';
    React.render(<App content={content}/>, document.body);
  },
  home: function () {
    React.render(<PostList/>, document.querySelector('.page-content')  );
  },
  single:function(request){
    React.render(<Single params={{slug: request.namedParams.slug}}/>, document.querySelector('.page-content'));
  }
};
