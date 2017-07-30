import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {IntlProvider, addLocaleData} from 'react-intl';
import fr from 'react-intl/locale-data/fr';

import configureStore from './configureStore';

import App from './App';
import './index.css';

const store = configureStore();

addLocaleData([...fr]);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="fr">
          <App />
        </IntlProvider>
      </Provider>
    )
  }
}
