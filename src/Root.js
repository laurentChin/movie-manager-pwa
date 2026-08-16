import React from "react";
import { Provider } from "react-redux";

import { IntlProvider } from "react-intl";

import store from "./configureStore";

import App from "./App";
import "./index.css";

export default function Root() {
  return (
    <Provider store={store}>
      <IntlProvider loading={null} locale="fr">
        <App />
      </IntlProvider>
    </Provider>
  );
}
