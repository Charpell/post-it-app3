import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppAPI from './js/utils/appAPI'
import App from "./js/components/App";
import main from './main.scss';
import bootstrap from './js/vendors/bootstrap'
import {firebaseAuth, firebase}from '../../server/config';


ReactDOM.render(
  <BrowserRouter basename="/#">
    <App />
  </BrowserRouter>
, document.getElementById('root'));