import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './reduxToolkit/store/store';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'
//axios.defaults.baseURL = 'https://fastball-production.up.railway.app/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
