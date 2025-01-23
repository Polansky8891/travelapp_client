import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Si usas React Router
import App from './src/App';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { createDevTools } from '@redux-devtools/core';
import { configureStore } from '@reduxjs/toolkit';
import { citiesReducer } from './src/redux/reducers/cityReducers';
import rootReducer from './src/redux/reducers/combinedReducers';


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
      {/* Si usas Redux y React Router */}
      
          
      
    </>
  );
