// PRIMERO: activa el namespacing de localStorage + semilla si el modo demo esta
// activo (debe correr antes de que cualquier servicio toque localStorage/Supabase).
import './demoBootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Registro de Service Worker para PWA (instalabilidad en celulares y offline básico)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('Service Worker registrado con éxito:', reg.scope);
      })
      .catch((err) => {
        console.warn('Fallo en el registro del Service Worker:', err);
      });
  });
}

import AuthGuard from './components/Auth/AuthGuard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthGuard>
      <App />
    </AuthGuard>
  </React.StrictMode>,
);
