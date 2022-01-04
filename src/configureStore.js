import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";

import { loaderMiddleware, flashMessageMiddleware } from "./core";
import { middleware as logMiddleware } from "./Log";

import rootReducer from "./RootReducer";
import { PERSISTED_STORE_NAME } from "./constants";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

localforage.config({
  driver: localforage.INDEXEDDB,
  name: PERSISTED_STORE_NAME,
  storeName: PERSISTED_STORE_NAME
});

const persistConfig = {
  key: PERSISTED_STORE_NAME,
  whitelist: ["auth", "user", "movies", "logs", "form", "router"],
  storage: localforage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancer(
      applyMiddleware(
        thunkMiddleware,
        loaderMiddleware,
        flashMessageMiddleware,
        logMiddleware
      )
    )
  );

  let persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
