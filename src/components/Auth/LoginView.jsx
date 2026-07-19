import React, { useState } from 'react';

export default function LoginView({ onLogin, errorMsg, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    onLogin(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-notion-bg-light dark:bg-notion-bg-dark px-4 font-sans transition-colors duration-200">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-notion-card-dark p-8 rounded-xl shadow-lg border border-gray-100 dark:border-notion-border-dark">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-asck-violet/20 to-asck-cyan/10 border border-asck-violet/15 p-1 overflow-hidden">
              <img src="/logo_asck.svg" alt="Logo de ASCK Software" className="w-full h-full object-contain dark:invert" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASCK Software</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Inicia sesión en el CRM</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Introduce tus credenciales para acceder al plan operativo</p>
        </div>

        {errorMsg && (
          <div role="alert" className="p-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900">
            {errorMsg}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-notion-bg-dark border border-gray-200 dark:border-notion-border-dark rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="ejemplo@asck.software"
              required
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-notion-bg-dark border border-gray-200 dark:border-notion-border-dark rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2 px-4 mt-6 text-sm gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Validando sesión...</span>
              </>
            ) : (
              <span>Ingresar</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
