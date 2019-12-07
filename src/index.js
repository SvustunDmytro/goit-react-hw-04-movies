import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
import App from './Containers/App/App';

ReactDOM.render(
  <HashRouter>
    <Route component={App} />
  </HashRouter>,
  document.getElementById('root'),
);
