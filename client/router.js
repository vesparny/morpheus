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

var appRouter = (
  <Routes location="history">
    <Route title="Next" handler={App}>
      <Route name="home" path="/" handler={PostList} />
      <Route name="single" path="/:slug" handler={Single} />
      <NotFoundRoute title="Page Not Found" handler={NotFound}/>
    </Route>
  </Routes>
);

module.exports = appRouter;
