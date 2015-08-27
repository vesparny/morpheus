import React from 'react';
import { Route } from 'react-router';
import Root from './containers/Root';
import Home from './containers/Home';

export default function() {
  return (
    <Route component={Root}>
      <Route component={Home} path="/" />
    </Route>
  );
}
