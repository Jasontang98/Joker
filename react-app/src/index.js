import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal'
import App from './App';
import configureStore from './store';
import './index.css';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
