import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { isSupabaseConfigured } from '../../services/supabase/supabaseClient';
import LoginView from './LoginView';

// Puerta de acceso única del CRM. FAIL-CLOSED: sin sesión de Supabase válida,
// jamás se renderizan los hijos (el CRM real). No existe bypass local/demo.
export default function AuthGuard({ children }) {
  const { session, login, loading } = useAuth();
  const [errorMsg, setErrorMsg] = React.useState('');

  const handleLogin = async (email, password) => {
    setErrorMsg('');
    const result = await login(email, password);
    if (!result.success) {
      setErrorMsg(result.error || 'Credenciales incorrectas');
    }
  };

  // Chequeo inicial de sesión (getSession) en curso: no decidir nada todavía.
  if (loading) {
    return (
      <div role="status" aria-live="polite" className="flex min-h-screen flex-col items-center justify-center gap-4 bg-notion-bg-light dark:bg-notion-bg-dark">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
        <p className="text-xs text-notion-text-muted-light dark:text-notion-text-muted-dark">Verificando sesión...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        {!isSupabaseConfigured && (
          <div role="alert" className="fixed top-0 inset-x-0 z-[300] bg-rose-600 text-white text-xs text-center py-1.5 px-4">
            Supabase no está configurado en este entorno. El inicio de sesión no puede completarse.
          </div>
        )}
        <LoginView onLogin={handleLogin} errorMsg={errorMsg} loading={loading} />
      </>
    );
  }

  return children;
}
