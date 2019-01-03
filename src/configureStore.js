import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  loaderMiddleware,
  flashMessageMiddleWare } from './core';

import rootReducer from './RootReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = ()  => {
  return createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(
      thunkMiddleware,
      loaderMiddleware,
      flashMessageMiddleWare
    ))
  )
}

export default configureStore;
