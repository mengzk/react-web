/**
 * Author: Meng
 * Date: 2023-11-16
 * Modify: 2023-11-16
 * Desc: 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { systemInit } from "./modules/system/index";

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

systemInit();
// console.log('process:', process.env)
