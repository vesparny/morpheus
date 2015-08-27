import 'babel-core/polyfill';
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from '../store/configureStore';
import routesFactory from '../createRoutes'
const store = configureStore();

window.React = React; // For chrome dev tool support

React.render(
  <Provider store={store}>
    {() =>
      <Router
        children={routesFactory()}
        history={new BrowserHistory()}
      />
    }
  </Provider>,
  document.getElementById('root')
);
