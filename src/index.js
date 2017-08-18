import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './scss/index.css';

ReactDOM.render(
  <App/>,
  window.document.getElementById('root')
);
registerServiceWorker();
