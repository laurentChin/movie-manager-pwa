import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { IntlProvider } from "react-intl";

import configureStore from "./configureStore";

import App from "./App";
import "./index.css";

const { store, persistor } = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider loading={null} locale="fr">
            <App />
          </IntlProvider>
        </PersistGate>
      </Provider>
    );
  }
}
