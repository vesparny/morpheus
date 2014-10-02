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
var Single = require('./components/single.jsx');

var appRouter = (
  <Routes location="hash">
    <Route title="Next" handler={App}>
      <Route name="list" path="/" handler={PostList} />
      <Route title="title" name="add" path="/single" handler={Single} />
      <NotFoundRoute title="Page Not Found" handler={NotFound}/>
    </Route>
  </Routes>
);

module.exports = appRouter;
