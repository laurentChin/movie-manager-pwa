import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { IntlProvider, addLocaleData } from "react-intl";
import fr from "react-intl/locale-data/fr";

import configureStore, { history } from "./configureStore";

import App from "./App";
import "./index.css";

const { store, persistor } = configureStore();

addLocaleData([...fr]);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <IntlProvider loading={null} locale="fr">
            <App history={history} />
          </IntlProvider>
        </PersistGate>
      </Provider>
    );
  }
}
