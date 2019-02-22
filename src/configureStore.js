import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";

import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import { loaderMiddleware, flashMessageMiddleWare } from "./core";

import rootReducer from "./RootReducer";
import { PERSISTED_STORE_NAME } from "./constants";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

localforage.config({
  driver: localforage.INDEXEDDB,
  name: PERSISTED_STORE_NAME,
  storeName: PERSISTED_STORE_NAME
});

const persisConfig = {
  key: PERSISTED_STORE_NAME,
  whitelist: ["auth", "user", "movies", "form", "router"],
  storage: localforage
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
