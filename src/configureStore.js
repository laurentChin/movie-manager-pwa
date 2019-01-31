import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import { loaderMiddleware, flashMessageMiddleWare } from "./core";

import rootReducer from "./RootReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

const persisConfig = {
  key: "movieManager",
  storage
};

const persistedReducer = persistReducer(persisConfig, rootReducer(history));

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loaderMiddleware,
        flashMessageMiddleWare
      )
    )
  );

  let persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
