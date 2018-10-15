import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
