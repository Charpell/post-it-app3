import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './js/components/container/App';
import main from './main.scss';
import bootstrap from './js/vendors/bootstrap';

ReactDOM.render(
  <BrowserRouter basename="/#">
    <App />
  </BrowserRouter>
, document.getElementById('root'));
