import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';

if(process.env.NODE_ENV === 'production' && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      if(localStorage.getItem('jwt')) {
        navigator.serviceWorker.controller.postMessage(localStorage.getItem('jwt'));
      }
    })
    .catch(() => {});
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
