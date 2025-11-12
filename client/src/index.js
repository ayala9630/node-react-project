import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';
import './index.css';
import './flags.css';
import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './store/tokenSlice';
import { Provider } from 'react-redux';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'

import { PrimeReactProvider } from 'primereact/api';


const store = configureStore({
    reducer: {
        tokenSlice
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PrimeReactProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </PrimeReactProvider>
);

