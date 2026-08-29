import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import i18n from './i18n/index.js';
import { WalletProvider } from './wallet/WalletContext.jsx';
import './styles.css';

const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Router>
        <WalletProvider>
          <App />
        </WalletProvider>
      </Router>
    </I18nextProvider>
  </StrictMode>,
);
