import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';

if(process.env.NODE_ENV === 'production' && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => {})
    .catch(() => {});
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
