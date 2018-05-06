import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { loaderMiddleware } from './core';

import rootReducer from './RootReducer';

const configureStore = ()  => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunkMiddleware,
      loaderMiddleware
    )
  )
}

export default configureStore;
