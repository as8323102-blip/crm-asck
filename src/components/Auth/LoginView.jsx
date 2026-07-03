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
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-notion-sidebar-dark p-8 rounded-xl shadow-lg border border-gray-100 dark:border-notion-border-dark">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.506-8.157-1.418m16.314 0C19.645 11.754 16.03 12 12 12c-4.03 0-7.645-.246-9.157-.918" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">ASCK Software</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Inicia sesión en el CRM</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Introduce tus credenciales para acceder al plan operativo</p>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900">
            {errorMsg}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-notion-bg-dark border border-gray-200 dark:border-notion-border-dark rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="ejemplo@asck.software"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña</label>
            <input
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
            className="w-full py-2 px-4 mt-6 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 rounded-lg shadow-sm transition duration-150 flex items-center justify-center space-x-2"
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
