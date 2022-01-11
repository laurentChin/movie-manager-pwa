import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { loaderMiddleware, flashMessageMiddleware } from "./Core";
import { middleware as logMiddleware } from "./Log";

import rootReducer from "./RootReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(
      thunkMiddleware,
      loaderMiddleware,
      flashMessageMiddleware,
      logMiddleware
    )
  )
);
