import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from '../reducers';

const loggerMiddleware = createLogger({
  level: 'info'
});

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

// Creates a preconfigured store.
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
