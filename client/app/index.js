import React, { Component } from 'react';
import { render } from 'react-dom';
import { CurrencyApp } from './components/currency';

import 'bootstrap';
import './sass/site.scss';

import { Provider } from 'react-redux';
import { store } from './store';

render(
  <Provider store={store}>
    <CurrencyApp />
  </Provider>,
  document.getElementById('App')
);
