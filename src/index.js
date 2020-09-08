import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// axios.defaults.baseURL = 'https://person-api-app.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:5000/';

axios.interceptors.request.use(requestConfig => {
  return requestConfig;
}, error => {
  return Promise.reject(error);
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
