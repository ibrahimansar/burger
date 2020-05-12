import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

const app =(
  <provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
