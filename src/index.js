import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import store from './redux/store.js'
import {Provider} from 'react-redux';//provider just connects our global state(Store) to whole App
import reportWebVitals from './reportWebVitals';

ReactDOM.render(//provider just connects our global state(Store) to whole App, and provide store
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


