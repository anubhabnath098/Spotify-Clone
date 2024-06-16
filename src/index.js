// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer, { initialState } from './utils/reducer';
import { StateProvider } from './utils/StateProvider';

ReactDOM.render(
    <>
    <StateProvider initialState ={initialState} reducer={reducer}>
    <App />
    </StateProvider>
      
    </>
  ,
  document.getElementById('root')
);