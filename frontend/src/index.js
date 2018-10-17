import React from 'react';
import ReactDOM from 'react-dom';
import Index from 'pages/index';
import store from 'store';
import { Provider } from 'react-redux';
import 'styles.css';

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById('root')
);
