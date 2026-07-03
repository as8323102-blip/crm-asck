import React, { useState } from 'react';
import { activeProvider } from '../../services/config';
import { useAuth } from '../../hooks/useAuth';
import LoginView from './LoginView';

export default function AuthGuard({ children }) {
  const { currentUser, login, loading } = useAuth();
  const [session, setSession] = useState(() => {
    // Si es local, auto-iniciar sesión con el integrante activo
    if (activeProvider === 'local') return { user: currentUser };
    
    const saved = localStorage.getItem('asck_crm_session');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (email, password) => {
    setErrorMsg('');
    const result = await login(email, password);
    if (result.success) {
      const newSession = { user: result.user };
      setSession(newSession);
      localStorage.setItem('asck_crm_session', JSON.stringify(newSession));
    } else {
      setErrorMsg(result.error || 'Credenciales incorrectas');
    }
  };

  // Si no hay sesión y está en modo Supabase, exigir login
  if (activeProvider === 'supabase' && !session) {
    return (
      <LoginView
        onLogin={handleLogin}
        errorMsg={errorMsg}
        loading={loading}
      />
    );
  }

  return children;
}
