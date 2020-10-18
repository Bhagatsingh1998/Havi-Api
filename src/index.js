import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import personDataReducer from './store/reducers/personsDataReducer'
import tagsReducer from './store/reducers/tagsReducer';
import tableHeaderReducer from './store/reducers/tableHeaderReducer';
import authReducer from './store/reducers/authReducer';

import * as serviceWorker from './serviceWorker';


const rootReducer = combineReducers({
  persons: personDataReducer,
  tags: tagsReducer,
  theaders: tableHeaderReducer,
  auth: authReducer
});
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
